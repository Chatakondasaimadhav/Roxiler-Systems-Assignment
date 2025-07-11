exports.getStores = async (req, res) => {
  const result = await pool.query(`
    SELECT s.id, s.name, s.address,
      COALESCE(AVG(r.rating), 0)::numeric(2,1) AS average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `);
  res.json(result.rows);
};

exports.rateStore = async (req, res) => {
  const { store_id, rating } = req.body;
  await pool.query(`
    INSERT INTO ratings (user_id, store_id, rating)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, store_id)
    DO UPDATE SET rating = EXCLUDED.rating
  `, [req.user.id, store_id, rating]);
  res.send('Rating submitted');
};
