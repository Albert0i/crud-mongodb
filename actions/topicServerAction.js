"use server"

export const getTopics = async () => {
    console.log('getTopics Server Action')
    
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }
  
      return res.json();
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };

  export const getTopicById = async (id) => {
    console.log('getTopicById Server Action')

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

export const addTopic = async (title, description) => {
    console.log('addTopic Server Action')
    
    try {
        const res = await fetch("http://localhost:3000/api/topics", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });

        //console.log(res)
        return { ok: res.ok, status: res.status }
      } catch (error) {
        console.log(error);
      }
}

export const updateTopic = async (id, newTitle, newDescription) => {
    console.log('updateTopic Server Action')

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      //console.log(res)
      return { ok: res.ok, status: res.status }
    } catch (error) {
      console.log(error);
    }
}

export const deleteTopic = async (id) => {
    console.log('deleteTopic Server Action')

    try {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      });

        //console.log(res)
        return { ok: res.ok, status: res.status }
    } catch (error) {
      console.log(error);
    }      
}
