import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios(`name`, `phone`, `email`, `pets_name`, `age`, `weight`, `species`, `breed`) VALUES(?)";

  const values = [
    req.body.name,
    req.body.phone,
    req.body.email,
    req.body.pets_name,
    req.body.age,
    req.body.weight,
    req.body.species,
    req.body.breed,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("User created successfully!");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `name` = ?, `phone` = ?, `email` = ?, `pets_name` = ?, `age` = ?, `weight` = ?, `species` = ?, `breed` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.phone,
    req.body.email,
    req.body.pets_name,
    req.body.age,
    req.body.weight,
    req.body.species,
    req.body.breed,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("User updated successfully");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("User deleted successfully.");
  });
};