import { useState } from "react";
import { Search, Plus, Filter, MapPin, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample chemical listings
  const chemicalListings = [
    {
      id: 1,
      name: "Sodium Chloride (NaCl)",
      purity: "99.5%",
      quantity: "1000 kg",
      price: "$0.25/kg",
      supplier: "ChemCorp Industries",
      location: "Houston, TX",
      category: "Inorganic Salt",
      cas: "7647-14-5",
      listedDate: "2 days ago",
      inStock: true
    },
    {
      id: 2,
      name: "Sulfuric Acid (H2SO4)",
      purity: "98%",
      quantity: "500 L",
      price: "$0.45/L",
      supplier: "Industrial Chemicals Ltd",
      location: "Chicago, IL",
      category: "Acid",
      cas: "7664-93-9",
      listedDate: "1 day ago",
      inStock: true
    },
    {
      id: 3,
      name: "Acetone (C3H6O)",
      purity: "99.9%",
      quantity: "200 L",
      price: "$1.20/L",
      supplier: "Solvent Solutions Inc",
      location: "Newark, NJ",
      category: "Solvent",
      cas: "67-64-1",
      listedDate: "3 hours ago",
      inStock: false
    },
    {
      id: 4,
      name: "Calcium Carbonate (CaCO3)",
      purity: "99%",
      quantity: "2000 kg",
      price: "$0.15/kg",
      supplier: "Mineral Resources Co",
      location: "Phoenix, AZ",
      category: "Carbonate",
      cas: "471-34-1",
      listedDate: "1 week ago",
      inStock: true
    }
  ];

  const categories = ["all", "Acid", "Base", "Solvent", "Inorganic Salt", "Carbonate", "Organic"];

  const filteredChemicals = chemicalListings.filter(chemical => {
    const matchesSearch = chemical.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chemical.cas.includes(searchTerm) ||
                         chemical.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || chemical.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900">Ben Chemical</h1>
              <Badge variant="secondary" className="ml-2">B2B</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                List Chemical
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search chemicals by name, CAS number, or supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredChemicals.length} of {chemicalListings.length} chemical listings
          </p>
        </div>

        {/* Chemical Listings */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChemicals.map((chemical) => (
            <Card key={chemical.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-blue-900">{chemical.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      CAS: {chemical.cas}
                    </CardDescription>
                  </div>
                  <Badge variant={chemical.inStock ? "default" : "secondary"}>
                    {chemical.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Purity:</span>
                    <span className="font-medium">{chemical.purity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <span className="font-medium">{chemical.quantity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-bold text-green-600 text-lg">{chemical.price}</span>
                  </div>
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">{chemical.supplier}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {chemical.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      Listed {chemical.listedDate}
                    </div>
                  </div>
                  <div className="pt-2">
                    <Badge variant="outline" className="text-xs">
                      {chemical.category}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1" disabled={!chemical.inStock}>
                    <DollarSign className="w-4 h-4 mr-1" />
                    Request Quote
                  </Button>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChemicals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No chemicals found matching your search criteria.</p>
            <Button className="mt-4" variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ben Chemical</h3>
              <p className="text-gray-400 text-sm">
                The leading B2B marketplace for chemical trading and procurement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Buyers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Browse Chemicals</li>
                <li>Request Quotes</li>
                <li>Bulk Orders</li>
                <li>Quality Assurance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Suppliers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>List Products</li>
                <li>Manage Inventory</li>
                <li>Track Orders</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Contact Us</li>
                <li>Safety Guidelines</li>
                <li>Documentation</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Ben Chemical. All rights reserved. Licensed chemical marketplace.</p>
            <p className="mt-2">Developed by Beniam</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
