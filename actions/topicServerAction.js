
export const getTopics = async () => {
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

export const addTopic = async (title, description) => {
    try {
        const res = await fetch("http://localhost:3000/api/topics", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
  
        // if (res.ok) {
        //   router.push("/");
        // } else {
        //   throw new Error("Failed to create a topic");
        // }
        return res
      } catch (error) {
        console.log(error);
      }
}

export const updateTopic = async (id, newTitle, newDescription) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ newTitle, newDescription }),
    });

    // if (!res.ok) {
    //   throw new Error("Failed to update topic");
    // }

    // router.refresh();
    // router.push("/");
    return res
  } catch (error) {
    console.log(error);
  }
}

export const deleteTopic = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
      method: "DELETE",
    });

    // if (res.ok) {
    //   router.refresh();
    // } else {
    //   throw new Error("Failed to create a topic");
    // }
    return res
  } catch (error) {
    console.log(error);
  }      
}
