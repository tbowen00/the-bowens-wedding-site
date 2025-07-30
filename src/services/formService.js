// A centralized service for submitting data to Netlify Forms.

const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };
  
  export const submitNetlifyForm = async (formName, formData) => {
    const dataToSubmit = {
      "form-name": formName,
      ...formData,
    };
  
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(dataToSubmit)
      });
  
      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status} ${response.statusText}`);
      }
  
      return { success: true };
    } catch (error) {
      console.error(`Error submitting ${formName} form:`, error);
      return { success: false, error: error.message };
    }
  };