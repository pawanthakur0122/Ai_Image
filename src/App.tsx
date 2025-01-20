import React, { useState } from 'react';
import { ImageIcon, Wand2, Sparkles, Image as ImageLucide, LoaderIcon, Download, RefreshCw, Home, Book, Code, Mail } from 'lucide-react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState('home');

  const sampleImages = [
    {
      prompt: "A majestic dragon soaring through sunset clouds",
      url: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&q=80"
    },
    {
      prompt: "Futuristic cityscape with flying vehicles",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80"
    },
    {
      prompt: "Enchanted forest with glowing butterflies",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
    }
  ];

  const generateImage = async () => {
    if (!prompt) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      const blob = await response.blob();
      setGeneratedImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `dreamforge-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetPrompt = () => {
    setPrompt('');
    setGeneratedImage('');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto py-12">
            <h2 className="text-4xl font-bold mb-8">About DreamForge AI</h2>
            <div className="prose prose-invert">
              <p className="text-lg text-gray-300 mb-6">
                DreamForge AI represents the pinnacle of artificial intelligence image generation technology. 
                Our state-of-the-art platform transforms your imagination into stunning visual reality.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Founded with the vision of making AI-powered creativity accessible to everyone, 
                DreamForge AI combines cutting-edge technology with an intuitive user interface.
              </p>
              <div className="bg-gray-800 p-6 rounded-lg mt-8">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-300">
                  To empower creators, artists, and dreamers with the tools they need to bring their 
                  visions to life through the power of artificial intelligence.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'docs':
        return (
          <div className="max-w-4xl mx-auto py-12">
            <h2 className="text-4xl font-bold mb-8">Documentation</h2>
            <div className="space-y-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
                <p className="text-gray-300 mb-4">
                  Simply enter a descriptive prompt of the image you want to create. 
                  The more detailed your prompt, the better the results.
                </p>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <code className="text-purple-400">
                    Example: "A majestic red dragon soaring through golden sunset clouds, digital art style"
                  </code>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Tips for Better Results</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Be specific with your descriptions</li>
                  <li>Include style preferences (e.g., "digital art", "oil painting")</li>
                  <li>Mention lighting and atmosphere</li>
                  <li>Specify color schemes</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-4xl mx-auto py-12">
            <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
            <div className="bg-gray-800 p-8 rounded-lg">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return (
          <>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Transform Your Words into Art</h2>
              <p className="text-gray-400 text-lg">
                Experience the power of AI-driven image generation. Simply describe what you want to see.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-16">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to create..."
                  className="flex-1 px-6 py-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-white placeholder-gray-400"
                />
                <button
                  onClick={generateImage}
                  disabled={loading || !prompt}
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <LoaderIcon className="animate-spin h-5 w-5" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                  Generate
                </button>
              </div>
            </div>

            {generatedImage && (
              <div className="max-w-2xl mx-auto mb-16">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <img
                    src={generatedImage}
                    alt="Generated artwork"
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={downloadImage}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                      Download Image
                    </button>
                    <button
                      onClick={resetPrompt}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <RefreshCw className="h-5 w-5" />
                      New Image
                    </button>
                  </div>
                </div>
              </div>
            )}

            <section className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <ImageIcon className="h-6 w-6 text-purple-400" />
                Inspiration Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sampleImages.map((sample, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={sample.url}
                      alt={sample.prompt}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-sm text-gray-400">{sample.prompt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wand2 className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold">DreamForge AI</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActivePage('home')}
              className={`flex items-center gap-2 ${activePage === 'home' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
            >
              <Home className="h-5 w-5" />
              Home
            </button>
            <button
              onClick={() => setActivePage('about')}
              className={`flex items-center gap-2 ${activePage === 'about' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
            >
              <Book className="h-5 w-5" />
              About
            </button>
            <button
              onClick={() => setActivePage('docs')}
              className={`flex items-center gap-2 ${activePage === 'docs' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
            >
              <Code className="h-5 w-5" />
              Docs
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className={`flex items-center gap-2 ${activePage === 'contact' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
            >
              <Mail className="h-5 w-5" />
              Contact
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wand2 className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold">DreamForge AI</span>
              </div>
              <p className="text-gray-400">
                Transforming imagination into reality through the power of AI.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setActivePage('home')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => setActivePage('about')} className="hover:text-white">About</button></li>
                <li><button onClick={() => setActivePage('docs')} className="hover:text-white">Documentation</button></li>
                <li><button onClick={() => setActivePage('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Tutorials</a></li>
                <li><a href="#" className="hover:text-white">API Documentation</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">GitHub</a></li>
                <li><a href="#" className="hover:text-white">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} DreamForge AI. Powered by Pawan Thakur
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;