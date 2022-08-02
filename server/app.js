const express = require('express')
const app = express()
const port = 3003

const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "siuvykla",
});


const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/admin')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 'admin') {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
        next();
    } else { // fron
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
}
app.use(doAuth)
  
  // AUTH
  app.get("/login-check", (req, res) => {
    let sql;
    let requests;
    if (req.query.role === 'admin') {
        sql = `
        SELECT
        name
        FROM users
        WHERE session = ? AND role = ?
        `;
        requests = [req.headers['authorization'] || '', req.query.role];
    } else {
        sql = `
        SELECT
        name
        FROM users
        WHERE session = ?
        `;
        requests = [req.headers['authorization'] || ''];
    }
    con.query(sql, requests, (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error' });
        } else {
            res.send({ msg: 'ok' });
        }
    });
  });
  
  app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND pass = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key });
        }
    });
  });
  
  
  //Create Product

app.post("/admin/products", (req, res) => {
    const sql = `
    INSERT INTO products
    (type, picture, color, hexcolor, price)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.type, req.body.picture, req.body.color, req.body.hexColor, req.body.price], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, new and shiny product was created', type: 'success' } });
    });
});

// Read  Products
app.get("/admin/products", (req, res) => {
    const sql = `
    SELECT *
    FROM products
    ORDER BY type
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
  
//Delete Products

app.delete("/admin/products/:id", (req, res) => {
    const sql = `
    DELETE FROM products
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
    });
  });

  //Edit Product
app.put("/admin/products/:id", (req, res) => {
    const sql = `
    UPDATE products
    SET type = ? , color = ?, hexcolor = ?, price = ?, picture = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.type, req.body.color, req.body.hexColor, req.body.price, req.body.picture, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Cat updated. Now it is as new', type: 'success' } });
    });
  });


  // Read  Products
app.get("/products", (req, res) => {
    const sql = `
    SELECT products.type, color, hexcolor, products.price, products.picture
    FROM products
    ORDER BY type
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
  
// Read FRONT ORDERS
app.get("/orders", (req, res) => {
    const sql = `
    SELECT orders.size, orders.comment, products.type AS prod, products.price AS price, approved
  FROM orders
  LEFT JOIN products
  ON products.id = orders.product_id
  
  `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
  });

  //CREATE ORDERS FRONT
app.post("/orders", (req, res) => {
    const sql = `
    INSERT INTO orders
    (size, product_id, comment)
    VALUES (?, ?, ?)
    `;
    con.query(
      sql,
      [
        req.body.size,
        req.body.product,
        req.body.comment,
        
      ],
      (err, result) => {
        if (err) throw err;
        res.send({
          result,
          msg: { text: "OK, new and shiny product was created", type: "success" },
        });
      }
    );
  });

  // Read BACK ORDERS
app.get("/admin/orders", (req, res) => {
    const sql = `
    SELECT *
  FROM orders
  
  
  `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
  });

//Delete Orders

app.delete("/admin/orders/:id", (req, res) => {
    const sql = `
    DELETE FROM orders
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
    });
  });

  //Edit Order
app.put("/admin/orders/:id", (req, res) => {
    const sql = `
    UPDATE orders
    SET approved = ? 
    WHERE id = ?
    `;
    con.query(sql, [req.body.approved, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Cat updated. Now it is as new', type: 'success' } });
    });
  });
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Portas ${port} klauso!`)
})