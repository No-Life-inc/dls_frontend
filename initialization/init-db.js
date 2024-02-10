// Create a MongoDB collection and insert some post documents
db.stories.insert([
    {
      _id: ObjectId(),
      title: "Post 1",
      text: "This is the body of post 1.",
      imageUrl: "https://example.com/image1.jpg"
    },
    {
      _id: ObjectId(),
      title: "Post 2",
      text: "This is the body of post 2.",
      imageUrl: "https://example.com/image2.jpg"
    },
    {
      _id: ObjectId(),
      title: "Post 3",
      text: "This is the body of post 3.",
      imageUrl: "https://example.com/image3.jpg"
    }
  ]);
  