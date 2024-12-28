const { Configuration, OpenAIApi } = require('openai');

// Configure OpenAI with your API key
const configuration = new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your actual API key
});
const openai = new OpenAIApi(configuration);

module.exports = async (post) => {
  // Function to get Rank Math SEO description
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

  // Function to generate a new SEO description using OpenAI
  async function generateSEODescription(content) {
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003', // Specify the model you want to use
        prompt: `Create an SEO-friendly description for the following content:\n\n${content}`,
        max_tokens: 150,
        temperature: 0.7,
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("Error generating SEO description:", error);
      return null;
    }
  }

  // Extract postmeta from the post object
  const postmeta = post.data.postmeta;

  // Get the SEO description
  let seoDescription = getRankMathDescription(postmeta);

  // If no description exists, generate one using OpenAI
  if (!seoDescription) {
    const content = post.data.content; // Assuming content is available in post.data
    seoDescription = await generateSEODescription(content);
  }

  // Return the final SEO description
  return seoDescription || "No description available.";
};
