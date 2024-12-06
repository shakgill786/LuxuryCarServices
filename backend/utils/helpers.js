const findAndDeleteImage = async (model, imageId, ownerKey, req, res) => {
    try {
      const image = await model.findByPk(imageId, {
        include: {
          model: ownerKey === 'ownerId' ? Spot : Review,
          attributes: [ownerKey],
        },
      });
  
      if (!image) return res.status(404).json({ message: `Image not found.` });
      const ownerId = image[ownerKey === 'ownerId' ? 'Spot' : 'Review'][ownerKey];
      if (ownerId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  
      await image.destroy();
      return res.json({ message: 'Successfully deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = { findAndDeleteImage };