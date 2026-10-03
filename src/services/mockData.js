// Enhanced Mock Data for Production Level App
// 21 premium restaurants with rich menus covering Indian, Cafe, Japanese, Arabic, Italian, Chinese, Spanish, Turkish cuisines.
const restaurants = [
    {
        id: 'r1', name: 'Spice Route', cuisine: 'Indian', rating: 4.8, distance: '0.5km',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Zero Wait',
        description: 'Authentic Indian flavors served in a modern, luxurious setting. Experience curries crafted with century-old recipes.',
        menu: [
            { id: 'm1_1', name: 'Dal Makhani Fondue', description: '24-hour slow cooked black lentils with rich butter cream', price: 450, tag: 'Signature Veg', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400' },
            { id: 'm1_2', name: 'Smoked Butter Chicken', description: 'Tender chicken tikka simmered in a rich velvety tomato gravy', price: 580, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
            { id: 'm1_3', name: 'Awadhi Mutton Biryani', description: 'Fragrant basmati cooked dum-style with tender spiced lamb and saffron', price: 650, tag: 'Chef Special', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r2', name: 'Cafe Kochi', cuisine: 'Cafe', rating: 4.5, distance: '1.2km',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Pre-book Available',
        description: 'Perfect spot for brunch and artisan coffee with a panoramic view overlooking Kochi harbor.',
        menu: [
            { id: 'm2_1', name: 'Smashed Avocado Sourdough', description: 'With feta crumble, poached farm egg, and chili flakes', price: 350, tag: 'Breakfast', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' },
            { id: 'm2_2', name: 'Truffle Mushroom Pasta', description: 'Handmade fettuccine tossed in light creamy wild mushroom sauce', price: 520, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&q=80&w=400' },
            { id: 'm2_3', name: 'Signature Cold Brew', description: '24-hour steeped single-origin Arabica with hint of vanilla', price: 210, tag: 'Beverage', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r3', name: 'Sushico', cuisine: 'Japanese', rating: 4.9, distance: '2.1km',
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Tables Filling Fast',
        description: 'Premium sushi and an authentic Japanese culinary experience led by master Chef Sato.',
        menu: [
            { id: 'm3_1', name: 'Volcano Roll', description: 'Spicy yellowfin tuna roll topped with flame-torched scallops', price: 850, tag: 'Chef Special', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=400' },
            { id: 'm3_2', name: 'A5 Wagyu Nigiri', description: 'Seared premium Japanese Wagyu with truffle glaze over seasoned rice', price: 1200, tag: 'Premium', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400' },
            { id: 'm3_3', name: 'Salmon Sashimi Platter', description: 'Thick-cut fresh Norwegian salmon with fresh wasabi and pickled ginger', price: 650, tag: 'Fresh', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r4', name: 'Al-Sultan Mandi', cuisine: 'Arabic', rating: 4.7, distance: '3.0km',
        image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=80&w=800',
        wait_time: '15 Mins Wait',
        description: 'Authentic Middle Eastern cuisine specializing in underground pit slow-cooked Mandi and grilled meats.',
        menu: [
            { id: 'm4_1', name: 'Lamb Mutton Mandi', description: 'Slow-roasted fall-apart lamb served over fragrant smoked rice', price: 750, tag: 'Signature', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400' },
            { id: 'm4_2', name: 'Mixed Grill Platter', description: 'Chicken shish tawook, tender lamb kebab, and seasoned beef tikka', price: 850, tag: 'Popular', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400' },
            { id: 'm4_3', name: 'Kunafa with Pistachio', description: 'Warm stretchy cheese pastry soaked in floral orange-blossom syrup', price: 300, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r5', name: 'La Bella Napoli', cuisine: 'Italian', rating: 4.7, distance: '4.5km',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Zero Wait',
        description: 'Wood-fired Neapolitan pizzas and handmade pastas in a rustic, romantic ambient setting.',
        menu: [
            { id: 'm5_1', name: 'Margherita DOP', description: 'San Marzano tomatoes, buffalo mozzarella, fresh basil, and extra virgin olive oil', price: 550, tag: 'Classic', image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=400' },
            { id: 'm5_2', name: 'Pappardelle al Cinghiale', description: 'Wide ribbon pasta with slow-braised aromatic herb ragù and parmesan', price: 720, tag: 'Chef Special', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400' },
            { id: 'm5_3', name: 'Classic Tiramisu', description: 'Espresso-soaked savoiardi ladyfingers, rich mascarpone cream, dark cocoa', price: 350, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r6', name: 'Zenith Pan-Asian', cuisine: 'Chinese', rating: 4.4, distance: '1.8km',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
        wait_time: '20 Mins Wait',
        description: 'A modern, vibrant atmosphere serving authentic wok-tossed delights and handcrafted Cantonese dim sums.',
        menu: [
            { id: 'm6_1', name: 'Kung Pao Chicken', description: 'Wok-fired chicken breast, crunchy roasted peanuts, and dried Szechuan chilies', price: 480, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=400' },
            { id: 'm6_2', name: 'Crispy Peking Duck', description: 'Golden roast duck served with steamed lotus pancakes, cucumber, and hoisin sauce', price: 850, tag: 'Premium', image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&q=80&w=400' },
            { id: 'm6_3', name: 'Dim Sum Basket', description: 'Assortment of crystal prawn dumplings, chicken sui mai, and vegetarian parcels', price: 420, tag: 'Starter', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r7', name: 'El Camino Tapas', cuisine: 'Spanish', rating: 4.6, distance: '2.5km',
        image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Zero Wait',
        description: 'Vibrant Spanish tapas bar featuring authentic paellas, artisanal sangrias, and cured Jamón.',
        menu: [
            { id: 'm7_1', name: 'Seafood Paella', description: 'Traditional saffron bomba rice with king tiger prawns, mussels, and tender calamari', price: 950, tag: 'Signature', image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=400' },
            { id: 'm7_2', name: 'Patatas Bravas', description: 'Crispy golden potato cubes topped with smoked paprika bravas sauce and garlic alioli', price: 280, tag: 'Tapas', image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=400' },
            { id: 'm7_3', name: 'Churros Con Chocolate', description: 'Crisp cinnamon-sugar churros served with thick hot dipping chocolate', price: 320, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r8', name: 'Istanbul Kebab House', cuisine: 'Turkish', rating: 4.8, distance: '1.5km',
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800',
        wait_time: '10 Mins Wait',
        description: 'Authentic Turkish charcoal grills, warm stone-baked bread, and rich Ottoman cultural flavors.',
        menu: [
            { id: 'm8_1', name: 'Iskender Kebab', description: 'Thinly sliced doner over buttery pide bread with roasted tomato puree and yogurt', price: 650, tag: 'Signature', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400' },
            { id: 'm8_2', name: 'Adana Kebab Platter', description: 'Spiced minced lamb hand-pressed on flat skewers and flame-grilled', price: 550, tag: 'Popular', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400' },
            { id: 'm8_3', name: 'Pistachio Baklava', description: 'Forty layers of crispy buttery phyllo pastry filled with crushed Antep pistachios', price: 320, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r9', name: 'Dubai Nights', cuisine: 'Arabic', rating: 4.5, distance: '4.2km',
        image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800',
        wait_time: '5 Mins Wait',
        description: 'Luxurious dining featuring exquisite Emirati and Lebanese mezze spreads and royal charcoal roasts.',
        menu: [
            { id: 'm9_1', name: 'Majboos Chicken', description: 'Spiced chicken roasted on saffron-scented basmati with fried cashews and dried lemon', price: 600, tag: 'Signature', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=400' },
            { id: 'm9_2', name: 'Moutabal & Fresh Pita', description: 'Charred smoked eggplant dip with tahini, pomegranate seeds, and hot clay-oven pita', price: 220, tag: 'Starter', image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=400' },
            { id: 'm9_3', name: 'Umm Ali Delight', description: 'Traditional creamy warm Egyptian bread pudding with pistachios, coconut, and raisins', price: 280, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r10', name: 'Dragon Palace', cuisine: 'Chinese', rating: 4.3, distance: '3.1km',
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800',
        wait_time: '15 Mins Wait',
        description: 'Traditional Cantonese family-style dining with legendary high-heat wok techniques and fresh seafood.',
        menu: [
            { id: 'm10_1', name: 'Sweet & Sour Crispy Chicken', description: 'Crispy batter chicken tossed in tangy pineapple sweet and sour glaze', price: 450, tag: 'Popular', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=400' },
            { id: 'm10_2', name: 'Beef Chow Fun', description: 'Wok-charred wide flat rice noodles with tender marinated beef and crunchy bean sprouts', price: 400, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400' },
            { id: 'm10_3', name: 'Golden Egg Tarts', description: 'Flaky French-style laminated pastry shell filled with silky warm egg custard', price: 180, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r11', name: 'Casa Madrid', cuisine: 'Spanish', rating: 4.8, distance: '5.0km',
        image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fc49?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Zero Wait',
        description: 'An intimate Spanish bodega known for extensive cellar selections, tapas, and rustic Iberian roasts.',
        menu: [
            { id: 'm11_1', name: 'Tortilla Española', description: 'Classic slow-cooked Spanish potato and caramelized onion omelette slice', price: 250, tag: 'Tapas', image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=400' },
            { id: 'm11_2', name: 'Arroz Negro', description: 'Authentic Valencian squid ink paella served with lemon wedges and house garlic alioli', price: 850, tag: 'Chef Special', image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=400' },
            { id: 'm11_3', name: 'Croquetas de Jamón', description: 'Creamy béchamel and cured Serrano ham croquettes crisp fried to perfection (4pcs)', price: 320, tag: 'Starter', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r12', name: 'Punjab Grill', cuisine: 'Indian', rating: 4.6, distance: '1.0km',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800',
        wait_time: '20 Mins Wait',
        description: 'Rich and hearty North Indian delicacies served piping hot from the clay tandoor oven.',
        menu: [
            { id: 'm12_1', name: 'Tandoori Platter', description: 'Smoky grilled chicken tikka, mutton seekh kebab, and paneer shashlik', price: 900, tag: 'Premium', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=400' },
            { id: 'm12_2', name: 'Paneer Butter Masala', description: 'Fresh malai cottage cheese simmered in a velvety cashew and tomato gravy', price: 420, tag: 'Veg', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400' },
            { id: 'm12_3', name: 'Garlic Naan Basket', description: 'Tandoor-charred leavened flatbread brushed with roasted garlic butter and cilantro', price: 150, tag: 'Sides', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r13', name: 'Bosporus Breeze', cuisine: 'Turkish', rating: 4.7, distance: '2.8km',
        image: 'https://images.unsplash.com/photo-1533758226065-0c7da0f0ce13?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Tables Filling Fast',
        description: 'A culinary journey through Istanbul with authentic open-fire wood-grilled kebabs and pide.',
        menu: [
            { id: 'm13_1', name: 'Mixed Grill Feast', description: 'Massive spread of lamb chops, chicken shish, kofte, and saffron pilaf', price: 1400, tag: 'Combo', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400' },
            { id: 'm13_2', name: 'Crispy Lahmacun', description: 'Paper-thin Turkish flatbread spread with finely ground seasoned lamb and fresh parsley', price: 280, tag: 'Popular', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400' },
            { id: 'm13_3', name: 'Turkish Kunefe', description: 'Shredded pastry layered with sweet melted cheese, soaked in hot syrup and pistachios', price: 350, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r14', name: 'Tokyo Drift Sushi', cuisine: 'Japanese', rating: 4.5, distance: '3.5km',
        image: 'https://images.unsplash.com/photo-1579027989536-b7b126259f90?auto=format&fit=crop&q=80&w=800',
        wait_time: '10 Mins Wait',
        description: 'Modern, upbeat conveying belt sushi with fusion twists and premium imported seafood.',
        menu: [
            { id: 'm14_1', name: 'Dragon Roll Supreme', description: 'Tempura prawn and avocado topped with roasted unagi eel and sweet kabayaki glaze', price: 750, tag: 'Popular', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=400' },
            { id: 'm14_2', name: 'Spicy Salmon Crispy Rice', description: 'Pan-seared sushi rice squares topped with spicy salmon tartare and jalapeño', price: 480, tag: 'Starter', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=400' },
            { id: 'm14_3', name: 'Matcha Green Tea Mochi', description: 'Chewy Japanese rice cake wrapping artisan Uji matcha ice cream (3pcs)', price: 250, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r15', name: 'Roma Trattoria', cuisine: 'Italian', rating: 4.8, distance: '1.2km',
        image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Zero Wait',
        description: 'Cozy, family-owned Italian spot rolling out handmade fresh pasta and focaccia every morning.',
        menu: [
            { id: 'm15_1', name: 'Spaghetti Carbonara', description: 'Traditional Roman recipe with crispy guanciale, egg yolks, pecorino romano, and black pepper', price: 580, tag: 'Signature', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=400' },
            { id: 'm15_2', name: 'Lasagna Bolognese al Forno', description: 'Layered fresh pasta sheets with slow-cooked beef ragù, velvety béchamel, and mozzarella', price: 650, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400' },
            { id: 'm15_3', name: 'Berry Panna Cotta', description: 'Silky chilled vanilla bean cream served with wild raspberry coulis', price: 300, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r16', name: 'The Bombay Canteen', cuisine: 'Indian', rating: 4.9, distance: '2.2km',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Pre-book Available',
        description: 'Celebrated modern Indian gastro-bar reinterpreting regional recipes with culinary elegance.',
        menu: [
            { id: 'm16_1', name: 'Mutton Keema Pav', description: 'Spiced minced lamb slow-braised with peas and served with butter-toasted brioche pav', price: 450, tag: 'Street Food', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
            { id: 'm16_2', name: 'Chettinad Pepper Chicken', description: 'Fiery roasted black pepper and coconut curry with curry leaves and shallots', price: 520, tag: 'Spicy', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400' },
            { id: 'm16_3', name: 'Filter Coffee Chocolate Mousse', description: 'Dark chocolate whipped mousse infused with Chikmagalur roasted filter coffee', price: 280, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r17', name: 'Calicut Kitchen', cuisine: 'Arabic', rating: 4.8, distance: '2.5km',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
        wait_time: '15 Mins Wait',
        description: 'Authentic Arabic & Malabar dining experience, famous for our traditional Mutton Mandi and rich Middle Eastern roasts.',
        menu: [
            { id: 'm17_1', name: 'Special Mutton Mandi', description: 'Slow-roasted tender lamb served over fragrant smoked rice, garnished with toasted almonds and fried onions', price: 850, tag: 'Signature', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400' },
            { id: 'm17_2', name: 'Peri-Peri Chicken Alfaham', description: 'Arabic charcoal grilled half-chicken marinated in green chili, garlic, and Mediterranean olive oil', price: 450, tag: 'Popular', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=400' },
            { id: 'm17_3', name: 'Cream Cheese Kunafa', description: 'Freshly baked golden crispy pastry soaked in saffron syrup, served warm with vanilla cream', price: 300, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r18', name: 'Club Shavaya', cuisine: 'Arabic', rating: 4.6, distance: '3.8km',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=800',
        wait_time: '10 Mins Wait',
        description: 'Specializing in the authentic Arabic roasted chicken experience. Tender, juicy Shavaya grilled to golden perfection.',
        menu: [
            { id: 'm18_1', name: 'Full Shavaya Chicken Combo', description: 'Whole slow-roasted chicken in secret Arabic spices, served with fresh kuboos, toum garlic paste, and pickled salad', price: 450, tag: 'Signature', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=400' },
            { id: 'm18_2', name: 'Spicy Shavaya Quarter', description: 'Quarter leg portion of our fiery spicy charcoal roasted chicken with dips', price: 160, tag: 'Popular', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400' },
            { id: 'm18_3', name: 'Hummus & Warm Pita', description: 'Silky smooth chickpea tahini puree drizzled with extra virgin olive oil and sumac', price: 150, tag: 'Starter', image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r19', name: 'Golden Dragon', cuisine: 'Chinese', rating: 4.7, distance: '1.9km',
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Zero Wait',
        description: 'Experience an authentic taste of Sichuan spices and delicate Cantonese dim sum in a warm oriental setting.',
        menu: [
            { id: 'm19_1', name: 'Original Har Gao', description: 'Translucent steamed king prawn dumplings (4pcs) served in a traditional bamboo steamer', price: 380, tag: 'Signature', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=400' },
            { id: 'm19_2', name: 'Sichuan Spicy Dan Dan Noodles', description: 'Hand-pulled noodles with house-made chili oil broth, minced chicken, and crushed peanuts', price: 420, tag: 'Spicy', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400' },
            { id: 'm19_3', name: 'Garlic Butter Bok Choy', description: 'Crisp baby Shanghai bok choy quickly flash-fried with fresh garlic and sesame oil', price: 250, tag: 'Veg', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r20', name: 'Ottoman Grill', cuisine: 'Turkish', rating: 4.9, distance: '2.1km',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
        wait_time: '15 Mins Wait',
        description: 'Enjoy the authentic sizzle of charcoal-grilled Turkish kebabs, charred peppers, and Anatolian hospitality.',
        menu: [
            { id: 'm20_1', name: 'Adana Kebab Platter', description: 'Hand-minced spiced lamb grilled on long skewers, served with warm lavash bread and sumac onions', price: 650, tag: 'Signature', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400' },
            { id: 'm20_2', name: 'Chicken Shish Tawook', description: 'Garlic and citrus marinated chicken breast skewers, charred over natural charcoal embers', price: 480, tag: 'Popular', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=400' },
            { id: 'm20_3', name: 'Turkish Frothy Ayran', description: 'Traditional chilled salted yogurt drink whisked until velvety and refreshing', price: 120, tag: 'Beverage', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'r21', name: 'Bosphorus Delight', cuisine: 'Turkish', rating: 4.6, distance: '3.4km',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
        wait_time: 'Zero Wait',
        description: 'Specializing in freshly baked Turkish boat flatbreads (Pide) and sweet crispy Baklava straight from the stone hearth.',
        menu: [
            { id: 'm21_1', name: 'Kiymali Pide', description: 'Traditional boat-shaped Turkish flatbread topped with spiced minced beef, tomatoes, and herbs', price: 380, tag: 'Signature', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400' },
            { id: 'm21_2', name: 'Kasarli Sucuklu Pide', description: 'Stone-baked flatbread loaded with aged kasar cheese and spicy Turkish beef sausage', price: 450, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=400' },
            { id: 'm21_3', name: 'Walnut & Honey Baklava', description: 'Crisp buttery layered pastry packed with mountain walnuts and drenched in orange blossom syrup (4pcs)', price: 300, tag: 'Dessert', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=400' }
        ]
    }
];

export const mockRestaurants = restaurants;
