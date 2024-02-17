// Create a MongoDB collection and insert some post documents
db.stories.insert([
    {
      _id: ObjectId(),
      title: "Post 1",
      bodyText: "This is the body of post 1.",
      imageUrl: "https://example.com/image1.jpg",
      createdAt: new Date(),
    },
    {
      _id: ObjectId(),
      title: "Post 2",
      bodyText: "This is the body of post 2.",
      imageUrl: "https://example.com/image2.jpg",
      createdAt: new Date(),
    },
    {
      _id: ObjectId(),
      title: "Post 3",
      bodyText: "This is the body of post 3.",
      imageUrl: "https://example.com/image3.jpg",
      createdAt: new Date(),
    }
  ]);
  