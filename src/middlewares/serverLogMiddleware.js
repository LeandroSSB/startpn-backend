export default async (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  return next();
}