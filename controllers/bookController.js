const Book = require('../models/book');
const User = require('../models/User'); 


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addBook = async (req, res) => {
  const { title, author, isbn, publishedYear } = req.body;
  try {
    const newBook = new Book({ title, author, isbn, publishedYear });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, publishedYear } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, isbn, publishedYear },
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.getBookRecommendations = async (req, res) => {
  try {
    const { role } = req.user; 

    if (role === 'admin') {
   
      const users = await User.find({ 'favorites': { $exists: true, $ne: [] } });

     
      const favoriteBookId = users[0]?.favorites[0]; 
      if (!favoriteBookId) {
        return res.status(400).json({ message: 'No favorite books found for users.' });
      }

    
      const favoriteBook = await Book.findById(favoriteBookId);
      if (!favoriteBook) {
        return res.status(400).json({ message: 'Favorite book not found.' });
      }

     
      const recommendedBooks = await Book.find({
        author: favoriteBook.author
      }).limit(5);

      return res.status(200).json(recommendedBooks);
    }
    const books = await Book.find().limit(5);
    return res.status(200).json(books); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.markAsFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    book.isFavorite = !book.isFavorite;
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { role } = req.user;

    let books;
    if (role === 'user') {
      books = await Book.find({ isFavorite: true });
    } else {
      books = await Book.find({});
    }

    res.status(200).json({ books });
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
