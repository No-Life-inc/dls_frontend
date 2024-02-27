// Create a MongoDB collection and insert some post documents
db.stories.insert([
    {
      _id: ObjectId(),
      title: "Post 1",
      body_text: "This is the body of post 1.",
      image_url: "https://example.com/image1.jpg",
      created_at: new Date(),
    },
    {
      _id: ObjectId(),
      title: "Post 2",
      body_text: "This is the body of post 2.",
      image_url: "https://example.com/image2.jpg",
      created_at: new Date(),
    },
    {
      _id: ObjectId(),
      title: "Post 3",
      body_text: "This is the body of post 3.",
      image_url: "https://example.com/image3.jpg",
      created_at: new Date(),
    }
  ]);

db.users.insert([
  {
    _id: ObjectId(),
    first_name: "Uno",
    last_name: "Testman",
    image_url: "https://example.com/image1.jpg",
    created_at: new Date(),
  },
  {
    _id: ObjectId(),
    first_name: "Deux",
    last_name: "Terstman",
    image_url: "https://example.com/image1.jpg",
    created_at: new Date(),
  },
  {
    _id: ObjectId(),
    first_name: "Tres",
    last_name: "Testerino",
    image_url: "https://example.com/image1.jpg",
    created_at: new Date(),
  },
]);
  