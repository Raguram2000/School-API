const db = require("../config/db");

// Add School
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validation
  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: "Invalid coordinates" });
  }

  const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(201).json({
      message: "School added successfully",
      id: result.insertId
    });
  });
};

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in KM
  
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  }


  exports.listSchools = (req, res) => {
    const { latitude, longitude } = req.query;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "User coordinates required" });
    }
  
    db.query("SELECT * FROM schools", (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);
  
      const schoolsWithDistance = results.map((school) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        );
  
        return { ...school, distance };
      });
  
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);
  
      res.json(schoolsWithDistance);
    });
  };