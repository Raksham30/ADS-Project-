import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo } from 'react';
import { iPhoneModels } from '@/data/iphoneData';
import { Star, Smartphone, Calendar, Tag } from 'lucide-react';

const Compare = () => {
  const [variantFilter, setVariantFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('year-desc');

  const filteredAndSortedModels = useMemo(() => {
    let filtered = [...iPhoneModels];

    // Apply variant filter
    if (variantFilter !== 'all') {
      filtered = filtered.filter(model => model.variant === variantFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'year-desc':
          return b.releaseYear - a.releaseYear;
        case 'year-asc':
          return a.releaseYear - b.releaseYear;
        case 'price-desc':
          return b.basePrice - a.basePrice;
        case 'price-asc':
          return a.basePrice - b.basePrice;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'rating-asc':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [variantFilter, sortBy]);

  const getDiscountedPrice = (basePrice: number, discount: number) => {
    return basePrice - (basePrice * discount / 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Compare iPhone Models</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Explore and compare specifications, pricing, and features across all iPhone models
            </p>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-8 border-border/50">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Filter by Variant</label>
                <Select value={variantFilter} onValueChange={setVariantFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Models</SelectItem>
                    <SelectItem value="Base">Base Models</SelectItem>
                    <SelectItem value="Pro">Pro Models</SelectItem>
                    <SelectItem value="Pro Max">Pro Max Models</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year-desc">Newest First</SelectItem>
                    <SelectItem value="year-asc">Oldest First</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                    <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Models Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedModels.map((model, idx) => (
              <Card key={idx} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{model.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={
                          model.variant === 'Base' ? 'border-blue-500 text-blue-600 dark:text-blue-400' :
                          model.variant === 'Pro' ? 'border-purple-500 text-purple-600 dark:text-purple-400' :
                          'border-green-500 text-green-600 dark:text-green-400'
                        }
                      >
                        {model.variant}
                      </Badge>
                    </div>
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">{model.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">• {model.releaseYear}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold">₹{getDiscountedPrice(model.basePrice, model.discount).toLocaleString()}</span>
                      {model.discount > 0 && (
                        <span className="text-sm text-muted-foreground line-through">₹{model.basePrice.toLocaleString()}</span>
                      )}
                    </div>
                    {model.discount > 0 && (
                      <Badge className="mt-2 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                        {model.discount}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Storage Options */}
                  <div className="mb-4">
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Storage Options</label>
                    <div className="flex flex-wrap gap-2">
                      {model.storage.map((storage, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {storage}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Available Colors</label>
                    <div className="flex flex-wrap gap-2">
                      {model.colors.slice(0, 3).map((color, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                      {model.colors.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{model.colors.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Stats */}
                <div className="px-6 py-4 bg-muted/30 border-t grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Calendar className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{model.releaseYear}</p>
                  </div>
                  <div>
                    <Tag className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{model.discount}% Off</p>
                  </div>
                  <div>
                    <Star className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{model.rating}/5</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredAndSortedModels.length === 0 && (
            <Card className="p-12 text-center border-border/50">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No models found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compare;
