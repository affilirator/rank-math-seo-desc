module.exports = (post) => {
  function getRankMathDescription(metaData) {
    if (!Array.isArray(metaData)) {
      console.error("Meta data is not an array or is undefined");
      return null;
    }

    const descriptionMeta = metaData.find(
      (meta) => meta.meta_key[0] === "rank_math_description"
    );
    return descriptionMeta ? descriptionMeta.meta_value[0] : null;
  }

  // Extract postmeta from the post object
  const postmeta = post.data.postmeta;

  // Get the SEO description
  const seoDescription = getRankMathDescription(postmeta);

  // Return a formatted output
  return "Rank Math SEO Description: " + (seoDescription || "Not found");
};
