import React, { useState, useEffect } from 'react';
import { Search, Play, ExternalLink, Image, Music, Video, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import SEO, { SITE_URL } from '@/components/SEO';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'article' | 'social' | 'image';
  category: string;
  thumbnail?: string;
  description?: string;
  source?: string;
  date?: string;
}

const mediaItems: MediaItem[] = [
  {
    id: '1',
    title: 'Police Brutality Documentation - Case Study',
    url: 'https://youtu.be/FeqyAghPmEI?si=afjecO3PEE3rDJMk',
    type: 'video',
    category: 'Legal Documentation',
    description: 'Human rights violation case documentation',
    source: 'YouTube',
    date: '2024',
    thumbnail: '/uploads/00794513-1237-4309-b855-598e2c8c5109.webp'
  },
  {
    id: '2',
    title: 'Police Brutality: A Never-Ending Cycle of Pain and Suffering',
    url: 'https://thekenyatimes.com/latest-kenya-times-news/police-brutality-a-never-ending-cycle-of-pain-and-suffering/',
    type: 'article',
    category: 'Human Rights',
    description: 'Analysis of systemic police brutality issues in Kenya',
    source: 'The Kenya Times',
    date: '2024'
  },
  {
    id: '3',
    title: 'Human Rights Violation Case Evidence',
    url: 'https://youtu.be/kZn2nNOIQ-c?si=_9Qw0WgdRdrK4ack',
    type: 'video',
    category: 'Legal Documentation',
    description: 'Video evidence for ongoing legal proceedings',
    source: 'YouTube',
    date: '2024'
  },
  {
    id: '4',
    title: 'Legal Analysis: Constitutional Rights',
    url: 'https://youtu.be/S8aDORAlyr4?si=JL6G80rsEr1nrpMs',
    type: 'video',
    category: 'Legal Analysis',
    description: 'Constitutional law analysis and commentary',
    source: 'YouTube',
    date: '2024'
  },
  {
    id: '5',
    title: 'Muroki: Deregulation the Way to Go for Hustler Economy',
    url: 'https://www.the-star.co.ke/news/infographics/2023-02-14-muroki-deregulation-the-way-to-go-for-hustler-economy',
    type: 'article',
    category: 'Economic Policy',
    description: 'Economic policy analysis and recommendations',
    source: 'The Star',
    date: '2023'
  },
  {
    id: '6',
    title: 'Legal Expert Analysis',
    url: 'https://thekenyatimes.com/our-experts/',
    type: 'article',
    category: 'Expert Commentary',
    description: 'Professional legal expert commentary and analysis',
    source: 'The Kenya Times',
    date: '2024'
  },
  {
    id: '7',
    title: 'Professional Legal Updates',
    url: 'https://x.com/iammwauramuroki?s=11',
    type: 'social',
    category: 'Social Media',
    description: 'Professional updates and legal insights',
    source: 'Twitter/X',
    date: '2024',
    thumbnail: '/uploads/7ac751ff-dfac-4f6b-9e97-e9e8eb7fe3b8.png'
  }
];

const categories = ['All', 'Legal Documentation', 'Human Rights', 'Legal Analysis', 'Economic Policy', 'Expert Commentary', 'Social Media'];

const MediaDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(mediaItems);

  useEffect(() => {
    const filtered = mediaItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'social': return <ExternalLink className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-gold-400 border-gold-400/30 bg-gold-400/10';
      case 'article': return 'text-blue-300 border-blue-300/30 bg-blue-300/10';
      case 'social': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'image': return 'text-purple-300 border-purple-300/30 bg-purple-300/10';
      default: return 'text-gray-300 border-gray-300/30 bg-gray-300/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-6">
      <SEO
        title="Media Center – Legal Insights & Videos | Mwaura Muroki Associates"
        description="Watch and read legal insights from Mwaura Muroki Associates: human rights documentation, constitutional analysis, hustler economy commentary and professional legal updates from Thika, Kenya."
        canonical={`${SITE_URL}/media`}
        keywords="Kenya legal news, Mwaura Muroki videos, human rights Kenya, constitutional law Kenya insights"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent mb-2">
            Media Center
          </h1>
          <p className="text-gray-300 text-lg">Legal documentation and professional content</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" aria-hidden />
            <Input
              type="text"
              placeholder="Search media content..."
              aria-label="Search media content"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-gold-400 focus:ring-gold-400/20 rounded-xl backdrop-blur-sm"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={cn(
                  "rounded-full transition-all duration-300 cursor-pointer",
                  selectedCategory === category
                    ? "bg-gold-400 text-navy-950 border-gold-400 hover:bg-gold-300 shadow-lg shadow-gold-400/20"
                    : "bg-white/5 border-white/15 text-gray-300 hover:bg-white/10 hover:border-gold-400/50"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="group bg-white/5 border-white/10 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-gold-400/40"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardContent className="p-6">
                {item.thumbnail && (
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <Badge className={cn("rounded-full border", getTypeColor(item.type))}>
                    {getTypeIcon(item.type)}
                    <span className="ml-2 capitalize">{item.type}</span>
                  </Badge>
                  <div className="text-xs text-gray-300">{item.date}</div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-gold-400 transition-colors duration-300">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-300">
                    Source: {item.source}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                    aria-label={`Open ${item.title}`}
                    className="text-gold-400 hover:text-gold-300 hover:bg-gold-400/10 rounded-full p-2 cursor-pointer"
                  >
                    {item.type === 'video' ? <Play className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">No media found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaDashboard;