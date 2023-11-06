const imageDownloader = require('image-downloader');

const uploadPhotoByLink = async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname.slice(0, 30) + '/uploads/' + newName,
  });
  res.json(newName);
};

module.exports = { uploadPhotoByLink };
