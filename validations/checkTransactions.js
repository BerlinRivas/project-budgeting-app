const checkName = (req, res, next) => {
    // console.log("running checkName function: ")
    // console.log(req.body.name)
    // console.log(req.body)
    // console.log(req)
    if (req.body.name) { 
      next();
    } else {
      res.status(400).json({ error: "Name is required" });
    }
  };
  


  module.exports = { checkName };