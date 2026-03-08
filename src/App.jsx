/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Gamepad2, Calculator, X, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setGames(gamesData);
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900">
                Eli's <span className="text-indigo-600">Math Help</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search for 'math' topics..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-full text-sm transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleFullScreen}
                className="p-2 text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest hidden sm:block">
                Educational Resources
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search for 'math' topics..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 focus:ring-2 focus:ring-indigo-500 rounded-xl text-sm outline-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Master Your "Calculations"</h2>
              <p className="text-indigo-100 text-lg mb-8">
                Explore our interactive modules designed to improve your focus, reaction time, and strategic thinking. All under the guise of advanced mathematics.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg">
                  Browse Modules
                </button>
                <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-400 transition-colors border border-indigo-400">
                  Study Guide
                </button>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-indigo-400 rounded-full opacity-20 blur-3xl"></div>
            <Calculator className="absolute right-12 bottom-12 w-32 h-32 text-indigo-500/30 -rotate-12 hidden lg:block" />
          </div>
        </section>

        {/* Games Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-zinc-800 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-indigo-600" />
              Featured Learning Modules
            </h3>
            <span className="text-sm text-zinc-500">{filteredGames.length} modules available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layoutId={game.id}
                onClick={() => setSelectedGame(game)}
                className="group cursor-pointer bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 transition-all hover:-translate-y-1"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-indigo-600" />
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-lg mb-1 group-hover:text-indigo-600 transition-colors">{game.title}</h4>
                  <p className="text-zinc-500 text-sm line-clamp-2">{game.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-zinc-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-zinc-400" />
              </div>
              <h4 className="text-lg font-semibold text-zinc-800">No modules found</h4>
              <p className="text-zinc-500">Try searching for something else or browse all categories.</p>
            </div>
          )}
        </section>
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-zinc-900/90 backdrop-blur-sm"
          >
            <motion.div
              layoutId={selectedGame.id}
              className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Gamepad2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{selectedGame.title}</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Module Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(selectedGame.url, '_blank')}
                    className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 bg-zinc-100 relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>

              <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                <p className="text-sm text-zinc-500 italic">
                  Tip: Use keyboard shortcuts for faster "calculations".
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-medium text-zinc-600">
                    Logic
                  </span>
                  <span className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-medium text-zinc-600">
                    Strategy
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-6 h-6 text-indigo-600" />
                <span className="text-xl font-bold">Eli's Math Help</span>
              </div>
              <p className="text-zinc-500 max-w-sm">
                The premier destination for students who need a little extra "help" with their "math" studies. 100% educational, 0% distractions.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Calculus Guide</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Algebra Modules</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Geometry Fun</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Eli</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} Eli's Math Help. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors"><Gamepad2 className="w-5 h-5" /></a>
              <a href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors"><Calculator className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
