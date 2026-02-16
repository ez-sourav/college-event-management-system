export function getBannerImageLink(req, res) {
  return res.status(201).json({ url: req.file.path });
}
