(function () {
    "use strict";

    var store = window.MOLY_STORE;
    if (!store) return;

    var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    var products = store.products;
    var pageOffset = page.split("").reduce(function (total, character) { return total + character.charCodeAt(0); }, 0) % products.length;
    var requestedProductId = new URLSearchParams(location.search).get("id");

    var pageTitles = {
        "index.html": "ទំព័រដើម",
        "index-2.html": "បណ្តុំសម្លៀកបំពាក់",
        "index-3.html": "ទំនិញពេញនិយម",
        "index-4.html": "ម៉ូដបុរស",
        "index-5.html": "ម៉ូដប្រចាំថ្ងៃ",
        "index-6.html": "បណ្តុំទំនើប",
        "index-7.html": "ម៉ូដថ្មីប្រចាំរដូវ",
        "index-8.html": "បណ្តុំពិសេស",
        "shop-grid-page.html": "ទំនិញទាំងអស់",
        "shop-grid-page-2.html": "បណ្តុំនារី",
        "shop-grid-page-3.html": "បណ្តុំបុរស",
        "shop-grid-left-sidebar-page.html": "ហាង — តម្រងខាងឆ្វេង",
        "shop-grid-right-sidebar-page.html": "ហាង — តម្រងខាងស្តាំ",
        "shop-list-page.html": "បញ្ជីទំនិញ",
        "shop-list-left-sidebar-page.html": "បញ្ជីទំនិញ — តម្រងខាងឆ្វេង",
        "shop-list-right-sidebar-page.html": "បញ្ជីទំនិញ — តម្រងខាងស្តាំ",
        "shop-detalis-page.html": "ព័ត៌មានលម្អិតទំនិញ",
        "shop-detalis-left-sidebar-page.html": "ព័ត៌មានទំនិញ — របារខាងឆ្វេង",
        "shop-detalis-right-sidebar-page.html": "ព័ត៌មានទំនិញ — របារខាងស្តាំ",
        "cart-page.html": "កន្ត្រកទំនិញ",
        "checkout-page.html": "បញ្ជាក់ការបញ្ជាទិញ",
        "login-page.html": "ចូលគណនី",
        "register-page.html": "បង្កើតគណនី",
        "blog-page.html": "ទស្សនាវដ្តីម៉ូដ",
        "blog-page-2.html": "អត្ថបទថ្មីៗ",
        "blog-left-sidebar-page.html": "អត្ថបទ — របារខាងឆ្វេង",
        "blog-right-sidebar-page.html": "អត្ថបទ — របារខាងស្តាំ",
        "blog-detalis-page.html": "អានអត្ថបទ",
        "about-page.html": "អំពី ស្លៀក",
        "contact-page.html": "ទំនាក់ទំនង",
        "404-page.html": "រកមិនឃើញទំព័រ",
        "404.html": "រកមិនឃើញទំព័រ"
    };

    var translations = {
        "Home": "ទំព័រដើម",
        "Features": "ទំនិញថ្មី",
        "Fashion": "ម៉ូដ",
        "Page": "ទំព័រ",
        "Shop": "ហាង",
        "Blog": "អត្ថបទ",
        "Contact Us": "ទំនាក់ទំនង",
        "My Account": "គណនីរបស់ខ្ញុំ",
        "Wish List": "បញ្ជីចង់បាន",
        "Wishlist": "បញ្ជីចង់បាន",
        "Checkout": "បញ្ជាក់ការបញ្ជាទិញ",
        "Shopping Cart": "កន្ត្រកទំនិញ",
        "Cart": "កន្ត្រក",
        "Login": "ចូលគណនី",
        "Register": "បង្កើតគណនី",
        "About Us": "អំពីយើង",
        "Shop Now": "ទិញឥឡូវនេះ",
        "Buy Now": "ទិញឥឡូវនេះ",
        "Discover More": "មើលបន្ថែម",
        "View More": "មើលបន្ថែម",
        "Read More": "អានបន្ថែម",
        "Add To Cart": "ដាក់ចូលកន្ត្រក",
        "Add to Cart": "ដាក់ចូលកន្ត្រក",
        "Men Fashion": "សម្លៀកបំពាក់បុរស",
        "Women Fashion": "សម្លៀកបំពាក់នារី",
        "New Arrival": "ទំនិញទើបមកដល់",
        "New Arrivals": "ទំនិញទើបមកដល់",
        "Featured Products": "ទំនិញពេញនិយម",
        "Best Seller": "ទំនិញលក់ដាច់",
        "Hot Sale": "លក់ពិសេស",
        "Sale": "បញ្ចុះតម្លៃ",
        "Categories": "ប្រភេទទំនិញ",
        "Category": "ប្រភេទ",
        "Color": "ពណ៌",
        "Color:": "ពណ៌៖",
        "Size": "ទំហំ",
        "QTY:": "ចំនួន៖",
        "Quantity": "ចំនួន",
        "Availability": "ស្ថានភាពទំនិញ",
        "IN STOCK": "មានក្នុងស្តុក",
        "In Stock": "មានក្នុងស្តុក",
        "Out Of Stock": "អស់ពីស្តុក",
        "Description": "ការពិពណ៌នា",
        "description": "ការពិពណ៌នា",
        "COMMENTS": "មតិយោបល់",
        "Comments": "មតិយោបល់",
        "review": "ការវាយតម្លៃ",
        "Reviews": "ការវាយតម្លៃ",
        "Item Features": "លក្ខណៈផលិតផល",
        "Share:": "ចែករំលែក៖",
        "Product": "ទំនិញ",
        "Product Name": "ឈ្មោះទំនិញ",
        "Price": "តម្លៃ",
        "Total": "សរុប",
        "Subtotal": "សរុបរង",
        "Cart Total": "សរុបក្នុងកន្ត្រក",
        "Update Cart": "ធ្វើបច្ចុប្បន្នភាពកន្ត្រក",
        "Continue Shopping": "បន្តទិញទំនិញ",
        "Proceed To Checkout": "បន្តទៅការបញ្ជាទិញ",
        "Apply Coupon": "ប្រើកូដបញ្ចុះតម្លៃ",
        "Coupon Code": "កូដបញ្ចុះតម្លៃ",
        "Shipping": "ការដឹកជញ្ជូន",
        "Free Shipping": "ដឹកជញ្ជូនឥតគិតថ្លៃ",
        "Billing Details": "ព័ត៌មានអ្នកទទួល",
        "Your Order": "ការបញ្ជាទិញរបស់អ្នក",
        "Place Order": "បញ្ជាក់ការបញ្ជាទិញ",
        "First Name": "នាមខ្លួន",
        "Last Name": "នាមត្រកូល",
        "Company Name": "ឈ្មោះក្រុមហ៊ុន",
        "Country": "ប្រទេស",
        "Address": "អាសយដ្ឋាន",
        "Town / City": "ក្រុង / ខេត្ត",
        "Postcode / ZIP": "លេខកូដប្រៃសណីយ៍",
        "Phone": "លេខទូរស័ព្ទ",
        "Email Address": "អ៊ីមែល",
        "Email": "អ៊ីមែល",
        "Password": "ពាក្យសម្ងាត់",
        "Confirm Password": "បញ្ជាក់ពាក្យសម្ងាត់",
        "Remember Me": "ចងចាំខ្ញុំ",
        "Lost your password?": "ភ្លេចពាក្យសម្ងាត់?",
        "Create Account": "បង្កើតគណនី",
        "Already have an account?": "មានគណនីរួចហើយ?",
        "Name": "ឈ្មោះ",
        "Subject": "ប្រធានបទ",
        "Message": "សារ",
        "Send Message": "ផ្ញើសារ",
        "Contact": "ទំនាក់ទំនង",
        "Newsletter": "ទទួលព័ត៌មានថ្មី",
        "Get Discount 30% Off !": "ទទួលបានបញ្ចុះតម្លៃ ១០% សម្រាប់ការទិញដំបូង",
        "Do not show this popup again !": "កុំបង្ហាញផ្ទាំងនេះម្តងទៀត",
        "Subscribe": "ចុះឈ្មោះ",
        "Search": "ស្វែងរក",
        "Sort By": "តម្រៀបតាម",
        "Show": "បង្ហាញ",
        "Default": "លំនាំដើម",
        "Latest": "ថ្មីបំផុត",
        "Price Low To High": "តម្លៃទាបទៅខ្ពស់",
        "Price High To Low": "តម្លៃខ្ពស់ទៅទាប",
        "Previous": "មុន",
        "Next": "បន្ទាប់",
        "All": "ទាំងអស់",
        "Related Products": "ទំនិញដែលពាក់ព័ន្ធ",
        "Tags": "ស្លាក",
        "Popular Post": "អត្ថបទពេញនិយម",
        "Recent Post": "អត្ថបទថ្មីៗ",
        "404 Page": "ទំព័ររកមិនឃើញ",
        "Back To Home": "ត្រឡប់ទៅទំព័រដើម"
    };

    Object.assign(translations, {
        "About Page": "អំពី ស្លៀក",
        "Blog Detalis Page": "អានអត្ថបទ",
        "Blog Page": "ទស្សនាវដ្តីម៉ូដ",
        "Shope Page": "ហាងសម្លៀកបំពាក់",
        "Shop Page": "ហាងសម្លៀកបំពាក់",
        "Checkout Page": "បញ្ជាក់ការបញ្ជាទិញ",
        "Login Page": "គណនីអតិថិជន",
        "Contact Page": "ទំនាក់ទំនង",
        "Our History": "ដំណើររបស់ ស្លៀក",
        "Start Now": "មើលបណ្តុំរបស់យើង",
        "START NOW": "មើលបណ្តុំរបស់យើង",
        "OR": "ឬ",
        "Forgot password?": "ភ្លេចពាក្យសម្ងាត់?",
        "View as:": "ទម្រង់បង្ហាញ៖",
        "Sort by:": "តម្រៀបតាម៖",
        "Most Recent": "ថ្មីបំផុត",
        "Show:": "បង្ហាញ៖",
        "All Categories": "ប្រភេទទំនិញ",
        "All Items": "ទំនិញទាំងអស់",
        "Wordpress": "អាវយឺត",
        "HTML": "អាវក្រៅ",
        "PSD Design": "ខោជីន",
        "CMS": "រ៉ូបនារី",
        "e-Commerce": "ស្បែកជើង",
        "More Categories": "ប្រភេទបន្ថែម",
        "Recent Blog": "អត្ថបទថ្មីៗ",
        "Recent Comments": "មតិថ្មីៗ",
        "Comments (2)": "មតិយោបល់ (២)",
        "Repost": "ចែករំលែកឡើងវិញ",
        "Reply": "ឆ្លើយតប",
        "Leave Reply": "ទុកសារ",
        "Nick name:": "ឈ្មោះ៖",
        "Email Address :": "អ៊ីមែល៖",
        "Write a message :": "សរសេរសារ៖",
        "SUBMIT": "ផ្ញើសារ",
        "Contact info": "ព័ត៌មានទំនាក់ទំនង",
        "CONTACT INFO": "ព័ត៌មានទំនាក់ទំនង",
        "Product": "ទំនិញ",
        "Description": "ការពិពណ៌នា",
        "Model": "លេខកូដ",
        "Edit": "កែប្រែ",
        "Quantite": "ចំនួន",
        "Unit Price": "តម្លៃឯកតា",
        "CONTINUE SHOPPING": "បន្តទិញទំនិញ",
        "UPDATE SHOPPING CART": "ធ្វើបច្ចុប្បន្នភាពកន្ត្រក",
        "Estimate Shopping And Tax": "គណនាការដឹកជញ្ជូន",
        "State/Province": "រាជធានី / ខេត្ត",
        "Zip/Postal Code": "លេខកូដប្រៃសណីយ៍",
        "GET QUOTE": "គណនាតម្លៃ",
        "Discount Code": "កូដបញ្ចុះតម្លៃ",
        "Enter your coupon code if you have one.": "បញ្ចូលកូដបញ្ចុះតម្លៃ ប្រសិនបើអ្នកមាន។",
        "APPLY": "ប្រើកូដ",
        "Grand Total": "សរុបចុងក្រោយ",
        "PROCED TO CHECKOUT": "បន្តទៅការបញ្ជាទិញ",
        "Buyer Info": "ព័ត៌មានអ្នកទិញ",
        "BUYER INFO": "ព័ត៌មានអ្នកទិញ",
        "Login Here": "ចូលគណនីនៅទីនេះ",
        "LOGIN HERE": "ចូលគណនីនៅទីនេះ",
        "First Name :": "នាមខ្លួន៖",
        "Last Name :": "នាមត្រកូល៖",
        "Addres 1 :": "អាសយដ្ឋាន៖",
        "Addres 2 :": "ព័ត៌មានអាសយដ្ឋានបន្ថែម៖",
        "City :": "ក្រុង / ស្រុក៖",
        "Posta Code :": "លេខកូដប្រៃសណីយ៍៖",
        "Country :": "ប្រទេស៖",
        "State :": "រាជធានី / ខេត្ត៖",
        "Billing Detalis": "សេចក្តីសង្ខេបការបញ្ជាទិញ",
        "BILLING DETALIS": "សេចក្តីសង្ខេបការបញ្ជាទិញ",
        "Delivary Cost": "ថ្លៃដឹកជញ្ជូន",
        "Order total": "សរុបការបញ្ជាទិញ",
        "Payment Methods": "វិធីទូទាត់",
        "PAYMENT METHODS": "វិធីទូទាត់",
        "Card Number :": "លេខកាត៖",
        "CVV :": "លេខសុវត្ថិភាព៖",
        "Month:": "ខែ៖",
        "Year:": "ឆ្នាំ៖",
        "Our Products": "ទំនិញរបស់យើង",
        "New Products": "ទំនិញថ្មី",
        "Special Products": "ទំនិញពិសេស",
        "Best Sellers": "ទំនិញលក់ដាច់",
        "On-Sale Product": "ទំនិញបញ្ចុះតម្លៃ",
        "Hot Lookbook": "ជម្រើសពេញនិយម",
        "Hot Todays Deals": "ការផ្តល់ជូនថ្ងៃនេះ",
        "Letest Blog": "អត្ថបទថ្មីៗ",
        "Instagram Lookbook": "ស្ទីលពីអតិថិជន",
        "New in Store": "ទើបមកដល់ហាង",
        "Deal of the Day": "ការផ្តល់ជូនប្រចាំថ្ងៃ",
        "UP TO 75%": "បញ្ចុះតម្លៃរហូតដល់ ៧៥%",
        "Up To 75%": "បញ្ចុះតម្លៃរហូតដល់ ៧៥%",
        "Save 30%": "សន្សំ ៣០%",
        "Women Smart Shirt": "អាវនារីសម្រាប់ថ្ងៃធ្វើការ",
        "LIMITED OFFER 25% OFF!": "ការផ្តល់ជូនមានកំណត់ បញ្ចុះ ២៥%",
        "Men T-Shirt Fashion - 2019": "បណ្តុំអាវយឺតបុរស",
        "Men Blazer Collection 2019": "បណ្តុំអាវក្រៅបុរស",
        "view all collections": "មើលបណ្តុំទាំងអស់",
        "Discover Now________": "ស្វែងយល់ឥឡូវនេះ",
        "Play This Video ----------------": "មើលរឿងរ៉ាវរបស់យើង",
        "Chose Size": "ជ្រើសទំហំ",
        "Chose Color": "ជ្រើសពណ៌",
        "FILTER": "តម្រង",
        "Interested : 05": "មានអ្នកចាប់អារម្មណ៍៖ ៥ នាក់",
        "564 Reviews(S)": "ការវាយតម្លៃ ៥៦៤",
        "Perfect unique design": "រចនាបែបសាមញ្ញ និងមានអត្តសញ្ញាណ",
        "Fully responsive": "សាច់ក្រណាត់ទន់ និងមានផាសុកភាព",
        "Amazing parallax effects": "ងាយផ្គូផ្គងសម្រាប់រាល់ថ្ងៃ",
        "SEO friendly": "កាត់ដេរម៉ត់ចត់",
        "Well organized and valid code": "ងាយថែទាំ និងប្រើបានយូរ",
        "Google fonts": "សមស្របនឹងអាកាសធាតុកម្ពុជា",
        "WPML ready": "មានច្រើនទំហំ និងច្រើនពណ៌"
    });

    Object.assign(translations, {
        "Men Collection": "បណ្តុំបុរស",
        "UP TO 30%": "បញ្ចុះតម្លៃរហូតដល់ ៣០%",
        "Footwear": "ស្បែកជើង",
        "Summer Style": "ស្ទីលសម្រាប់រដូវក្តៅ",
        "The Fashionisto": "ម៉ូដសាមញ្ញសម្រាប់រាល់ថ្ងៃ",
        "CHEAP SHIRTS": "អាវតម្លៃពិសេស",
        "when you buy 3 or more.": "នៅពេលទិញចាប់ពី ៣ ឡើងទៅ។",
        "OFF": "បញ្ចុះតម្លៃ",
        "Nam Cras": "របៀបជ្រើសក្រណាត់ត្រជាក់",
        "Enim Porta Proin": "ពណ៌ដែលងាយផ្គូផ្គង",
        "12 Comments": "មតិ ១២",
        "54 Comments": "មតិ ៥៤",
        "Country": "ប្រទេស",
        "There area many varia-": "ទំនិញជ្រើសរើស",
        "Facebook Google": "Facebook · Google",
        "Men Collection UP TO 30% Footwear": "បណ្តុំបុរស · បញ្ចុះតម្លៃស្បែកជើងរហូតដល់ ៣០%",
        "Admin By": "ដោយ",
        "- Alamgir Joy": "· ក្រុម ស្លៀក",
        "Kosmi Kotalia": "សុខា លីម",
        "Men Blazer Collection": "បណ្តុំអាវក្រៅបុរស",
        "Men T-Shirt Fashion": "បណ្តុំអាវយឺតបុរស",
        "- 2019": "ឆ្នាំ ២០២៦",
        "Limited Offer 25% Off!": "ការផ្តល់ជូនមានកំណត់ បញ្ចុះ ២៥%",
        "Limited Offer 25% Off": "ការផ្តល់ជូនមានកំណត់ បញ្ចុះ ២៥%",
        "Cheap Shirts": "អាវតម្លៃពិសេស",
        "Summer Style The Fashionisto": "ស្ទីលសាមញ្ញសម្រាប់រដូវក្តៅ",
        "Forgot": "ភ្លេច",
        "password?": "ពាក្យសម្ងាត់?",
        "Filter": "តម្រង"
    });

    function money(value) {
        return "$" + Number(value).toFixed(2);
    }

    function displaySizes(sizes) {
        return sizes.map(function (size) { return size === "One size" ? "ទំហំតែមួយ" : size; }).join(", ");
    }

    function headerMarkup() {
        return '<a class="kh-skip-link" href="#main-content">រំលងទៅមាតិកា</a>' +
            '<header class="kh-site-header">' +
                '<div class="kh-topbar"><div class="container">' +
                    '<p class="kh-topbar-offer">ដឹកជញ្ជូនឥតគិតថ្លៃក្នុងភ្នំពេញ សម្រាប់ការទិញចាប់ពី $50</p>' +
                    '<div class="kh-topbar-links"><a href="tel:+85512678495"><i class="fas fa-phone-alt" aria-hidden="true"></i> ' + store.brand.phone + '</a><a href="' + store.brand.telegram + '" target="_blank" rel="noopener">Telegram</a></div>' +
                '</div></div>' +
                '<div class="container kh-navbar">' +
                    '<a class="kh-logo" href="index.html" aria-label="' + store.brand.name + ' ទំព័រដើម">' + store.brand.name + '<small>' + store.brand.latinName + '</small></a>' +
                    '<nav class="kh-main-nav" id="kh-main-nav" aria-label="ម៉ឺនុយមេ"><ul>' +
                        '<li><a data-group="home" href="index.html">ទំព័រដើម</a></li>' +
                        '<li><a data-group="shop" href="shop-grid-page.html">ហាង</a></li>' +
                        '<li><a data-group="shop" href="shop-grid-page-2.html">នារី</a></li>' +
                        '<li><a data-group="shop" href="shop-grid-page-3.html">បុរស</a></li>' +
                        '<li><a data-group="blog" href="blog-page.html">អត្ថបទ</a></li>' +
                        '<li><a data-group="pages" href="contact-page.html">ទំនាក់ទំនង</a></li>' +
                    '</ul></nav>' +
                    '<div class="kh-actions">' +
                        '<button class="kh-icon-button" type="button" data-toggle-search aria-label="ស្វែងរក" aria-expanded="false"><i class="fas fa-search" aria-hidden="true"></i></button>' +
                        '<a class="kh-icon-button" href="login-page.html" aria-label="គណនីរបស់ខ្ញុំ"><i class="far fa-user" aria-hidden="true"></i></a>' +
                        '<a class="kh-icon-button" href="cart-page.html" aria-label="កន្ត្រកទំនិញ"><i class="fas fa-shopping-bag" aria-hidden="true"></i><span class="kh-count" data-cart-count>0</span></a>' +
                        '<button class="kh-menu-toggle" type="button" aria-controls="kh-main-nav" aria-expanded="false" aria-label="បើកម៉ឺនុយ"><i class="fas fa-bars" aria-hidden="true"></i></button>' +
                    '</div>' +
                '</div>' +
                '<div class="kh-search-panel"><div class="container"><form class="kh-search-form" role="search"><label class="sr-only" for="kh-search-input">ស្វែងរកទំនិញ</label><input id="kh-search-input" type="search" autocomplete="off" placeholder="ស្វែងរកសម្លៀកបំពាក់..."><button type="submit" aria-label="ស្វែងរក"><i class="fas fa-search" aria-hidden="true"></i></button></form><ul class="kh-search-results" aria-live="polite"></ul></div></div>' +
            '</header>';
    }

    function footerMarkup() {
        var homeVariants = ["index.html", "index-2.html", "index-3.html", "index-4.html", "index-5.html", "index-6.html", "index-7.html", "index-8.html"];
        var archivePages = ["shop-grid-left-sidebar-page.html", "shop-grid-right-sidebar-page.html", "shop-list-page.html", "shop-list-left-sidebar-page.html", "shop-list-right-sidebar-page.html", "shop-detalis-page.html", "shop-detalis-left-sidebar-page.html", "shop-detalis-right-sidebar-page.html", "blog-page-2.html", "blog-left-sidebar-page.html", "blog-right-sidebar-page.html", "blog-detalis-page.html", "register-page.html", "404.html"];
        return '<footer class="kh-site-footer"><div class="container">' +
            '<div class="row">' +
                '<div class="col-lg-4 col-md-6"><h2>' + store.brand.name + '</h2><p>' + store.brand.tagline + '</p><address class="kh-footer-contact"><p>' + store.brand.address + '</p><p><a href="tel:+85512678495">' + store.brand.phone + '</a><br><a href="mailto:' + store.brand.email + '">' + store.brand.email + '</a></p></address></div>' +
                '<div class="col-lg-2 col-sm-6"><h3>ហាង</h3><ul class="kh-footer-links"><li><a href="shop-grid-page-2.html">សម្លៀកបំពាក់នារី</a></li><li><a href="shop-grid-page-3.html">សម្លៀកបំពាក់បុរស</a></li><li><a href="shop-grid-page.html">ទំនិញថ្មី</a></li><li><a href="cart-page.html">កន្ត្រកទំនិញ</a></li></ul></div>' +
                '<div class="col-lg-3 col-sm-6"><h3>ជំនួយអតិថិជន</h3><ul class="kh-footer-links"><li><a href="about-page.html">អំពីយើង</a></li><li><a href="contact-page.html">ទំនាក់ទំនង</a></li><li><a href="login-page.html">គណនីរបស់ខ្ញុំ</a></li><li><a href="checkout-page.html">ការដឹកជញ្ជូន និងការទូទាត់</a></li></ul></div>' +
                '<div class="col-lg-3 col-sm-6"><h3>តាមដានយើង</h3><ul class="kh-footer-links"><li><a href="' + store.brand.telegram + '" target="_blank" rel="noopener">Telegram</a></li><li><a href="' + store.brand.facebook + '" target="_blank" rel="noopener">Facebook</a></li><li><a href="blog-page.html">ទស្សនាវដ្តីម៉ូដ</a></li></ul><details><summary>ប្លង់ទំព័រដើមទាំង ៨</summary><p>' + homeVariants.map(function (href, index) { return '<a href="' + href + '">' + (index + 1) + '</a>'; }).join(' · ') + '</p></details><details class="kh-footer-archive"><summary>ទំព័របន្ថែម</summary><p>' + archivePages.map(function (href, index) { return '<a href="' + href + '">' + (index + 1) + '</a>'; }).join(' · ') + '</p></details></div>' +
            '</div>' +
            '<div class="kh-footer-bottom"><div class="row"><div class="col-md-7">© ២០២៦ ' + store.brand.name + '។ រក្សាសិទ្ធិគ្រប់យ៉ាង។</div><div class="col-md-5 kh-footer-legal"><a href="about-page.html#privacy">គោលការណ៍ឯកជនភាព</a><a href="about-page.html#terms">លក្ខខណ្ឌប្រើប្រាស់</a></div></div></div>' +
        '</div></footer>';
    }

    function replaceSharedLayout() {
        var newsletterPopup = document.getElementById("autopopup-option");
        if (newsletterPopup) newsletterPopup.remove();

        var oldHeader = document.querySelector("header");
        if (oldHeader) {
            var shell = document.createElement("div");
            shell.innerHTML = headerMarkup();
            oldHeader.replaceWith(shell.firstElementChild, shell.lastElementChild);
        }

        var oldFooter = document.querySelector("footer");
        if (oldFooter) {
            var footerShell = document.createElement("div");
            footerShell.innerHTML = footerMarkup();
            oldFooter.replaceWith(footerShell.firstElementChild);
        }

        var main = document.querySelector("main, .slider-area, .page-title-area, .product-area, .about-area, .contact-area, .error-area");
        if (main && !main.id) main.id = "main-content";
    }

    function translateText() {
        var inlineReplacements = [
            [/Admin By\s*-\s*Alamgir Joy/gi, "ដោយ ក្រុម ស្លៀក ·"],
            [/Red More/gi, "អានបន្ថែម"],
            [/Masum Billa Munna/gi, "សុភា រ័ត្ន"],
            [/Exclusive at UX\/UI/gi, "អតិថិជន ស្លៀក"],
            [/39 minits ago/gi, "៣៩ នាទីមុន"],
            [/35 minits ago/gi, "៣៥ នាទីមុន"],
            [/49 minits ago/gi, "៤៩ នាទីមុន"],
            [/Xten@Instagram/gi, "@sliekcambodia"],
            [/Now Only \$299/gi, "តម្លៃពិសេសត្រឹម $29"],
            [/New Arrivals 2019/gi, "ទំនិញថ្មី ឆ្នាំ ២០២៦"],
            [/One size/gi, "ទំហំតែមួយ"],
            [/\bRED\b/g, "ក្រហម"],
            [/\bXl\b/g, "XL"]
        ];
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(function (node) {
            if (!node.parentElement || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(node.parentElement.tagName)) return;
            var normalized = node.nodeValue.replace(/\s+/g, " ").trim();
            if (translations[normalized]) {
                node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), translations[normalized]);
            } else if (/Lorem ipsum|Phasellus|Donec blandit|MOVIE STAR|Aliquam erat|Praesent|Pellentesque|In vitae|Nunc molestie|Nulla iaculis|Mauris gravida|alteration in some form|Sed id interdum|Nullam lacinia|There are many varia/i.test(normalized) && normalized.length > 24) {
                node.nodeValue = " សម្លៀកបំពាក់នេះជ្រើសរើសក្រណាត់ទន់ ស្រួលពាក់ និងងាយថែទាំ។ កាត់ដេរសមស្របសម្រាប់អាកាសធាតុកម្ពុជា និងអាចផ្គូផ្គងបានទាំងថ្ងៃធ្វើការ និងថ្ងៃសម្រាក។ ";
            }
            inlineReplacements.forEach(function (replacement) {
                node.nodeValue = node.nodeValue.replace(replacement[0], replacement[1]);
            });
        });

        var placeholders = {
            "Enter Your Email...": "បញ្ចូលអ៊ីមែលរបស់អ្នក...",
            "Enter your keywords.....": "ស្វែងរកទំនិញ...",
            "Search here...": "ស្វែងរកនៅទីនេះ...",
            "First Name": "នាមខ្លួន",
            "Last Name": "នាមត្រកូល",
            "Email": "អ៊ីមែល",
            "Password": "ពាក្យសម្ងាត់",
            "Subject": "ប្រធានបទ",
            "Message": "សរសេរសាររបស់អ្នក...",
            "United States": "កម្ពុជា",
            "Please select region, state or province": "ជ្រើសរាជធានី ឬខេត្ត"
        };
        document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(function (field) {
            var value = field.getAttribute("placeholder").trim();
            if (placeholders[value]) field.setAttribute("placeholder", placeholders[value]);
        });
    }

    function applyProduct(wrapper, product) {
        wrapper.setAttribute("data-product-id", product.id);
        wrapper.querySelectorAll(".product-detalis h6 a, h6 a[href*='shop-detalis'], h5 a[href*='shop-detalis']").forEach(function (link) {
            link.textContent = product.name;
            link.href = "shop-detalis-page.html?id=" + product.id.toLowerCase();
        });
        wrapper.querySelectorAll(".product-detalis > span:first-child").forEach(function (category) { category.textContent = product.category; });
        wrapper.querySelectorAll(".price span").forEach(function (price) { price.textContent = money(product.price); });
        wrapper.querySelectorAll(".price del").forEach(function (price) { price.textContent = money(product.originalPrice); });
        wrapper.querySelectorAll(".product-detalis p").forEach(function (description) {
            description.textContent = "កាត់ដេរពីក្រណាត់មានគុណភាព ស្រួលពាក់ និងងាយផ្គូផ្គង។ មានទំហំ " + displaySizes(product.sizes) + " និងពណ៌ " + product.colors.join(", ") + "។";
        });
        var image = wrapper.querySelector(".product-img > img");
        if (image) {
            image.src = product.image;
            image.alt = product.name + " — " + product.id;
            image.loading = "lazy";
            image.width = 1080;
            image.height = 1080;
        }
    }

    function populateProducts() {
        var wrappers = Array.prototype.filter.call(document.querySelectorAll(".product-wrapper"), function (wrapper) {
            return wrapper.querySelector(".product-img img") && wrapper.querySelector(".product-detalis");
        });
        wrappers.forEach(function (wrapper, index) { applyProduct(wrapper, products[(pageOffset + index) % products.length]); });

        document.querySelectorAll("img[src*='assets/img/product/product-']").forEach(function (image, index) {
            if (image.closest(".product-wrapper")) return;
            var product = products[(pageOffset + index) % products.length];
            image.src = product.image;
            image.alt = product.name + " — " + product.id;
            image.loading = "lazy";
        });

        var featured = products.find(function (product) { return product.id.toLowerCase() === String(requestedProductId || "").toLowerCase(); }) || products[0];
        document.querySelectorAll(".product-wrapper-2").forEach(function (detail) {
            detail.setAttribute("data-product-id", featured.id);
            var title = detail.querySelector("h6 a");
            if (title) title.textContent = featured.name;
            detail.querySelectorAll(".price span").forEach(function (item) { item.textContent = money(featured.price); });
            detail.querySelectorAll(".price del").forEach(function (item) { item.textContent = money(featured.originalPrice); });
            var availability = detail.querySelector(".availabillity");
            if (availability) availability.textContent = "ស្ថានភាពទំនិញ៖ មានក្នុងស្តុក " + featured.stock + " ឈុត";
        });

        document.querySelectorAll(".product-list-slider img, .slider-nav-thumbnails img").forEach(function (image) {
            image.src = featured.image;
            image.alt = featured.name;
            image.loading = "lazy";
        });
        document.querySelectorAll(".product-detalis-page .popup-img").forEach(function (link) { link.href = featured.image; });
    }

    function populateHeroes() {
        document.querySelectorAll(".slider-area .single-slide").forEach(function (slide, index) {
            var banner = store.banners[index % store.banners.length];
            var mobileImage = banner.image.replace("-desktop.webp", "-mobile.webp");
            slide.style.setProperty("--kh-hero-desktop", "linear-gradient(90deg, rgba(18,24,21,.62), rgba(18,24,21,.06)), url('" + new URL(banner.image, document.baseURI).href + "')");
            slide.style.setProperty("--kh-hero-mobile", "linear-gradient(180deg, rgba(18,24,21,.12), rgba(18,24,21,.72)), url('" + new URL(mobileImage, document.baseURI).href + "')");
            var eyebrow = slide.querySelector(".hero-text > p, h2, .slider-sub-title");
            var title = slide.querySelector("h1");
            var description = slide.querySelector(".hero-text > span, .slider-content > span");
            var link = slide.querySelector("a");
            if (eyebrow) eyebrow.textContent = banner.eyebrow;
            if (title) title.textContent = banner.title;
            if (description) description.textContent = banner.description;
            if (link) { link.textContent = "ទិញឥឡូវនេះ"; link.href = "shop-grid-page.html"; }
        });
    }

    function populateBlog() {
        var cards = document.querySelectorAll(".blog-wrapper, .single-blog");
        if (!cards.length) cards = document.querySelectorAll(".blog-detalis");
        cards.forEach(function (card, index) {
            var slide = card.closest("[data-slick-index]");
            var slideIndex = slide ? Number(slide.getAttribute("data-slick-index")) : index;
            var postIndex = ((slideIndex % store.blogPosts.length) + store.blogPosts.length) % store.blogPosts.length;
            var post = store.blogPosts[postIndex];
            var details = card.matches(".blog-detalis") ? card : card.querySelector(".blog-detalis") || card;
            var image = card.querySelector(".blog-img img, img[src*='/blog/']");
            var title = details.querySelector("h4 a, h5 a, h6 a, .blog-detalis > a, :scope > a");
            var excerpt = details.querySelector("p");
            var meta = details.querySelector(":scope > span");
            if (image) { image.src = post.image; image.alt = post.title; image.loading = "lazy"; }
            if (title) { title.textContent = post.title; title.href = "blog-detalis-page.html"; }
            if (excerpt) excerpt.textContent = post.excerpt;
            if (meta) meta.textContent = "ទស្សនាវដ្តី · " + post.date;
            details.querySelectorAll(".date, time").forEach(function (date) { date.textContent = post.date; });
        });
        document.querySelectorAll("img[src*='assets/img/blog/']").forEach(function (image, index) {
            if (image.closest(".blog-wrapper, .single-blog, .blog-detalis")) return;
            var post = store.blogPosts[index % store.blogPosts.length];
            image.src = post.image;
            image.alt = post.title;
            image.loading = "lazy";
        });
    }

    function setPageBanner() {
        var banner = document.querySelector(".page-title-area");
        if (!banner) return;
        var image = page.indexOf("about") === 0 || page.indexOf("contact") === 0 ? "assets/img/khmer/banners/about-contact.webp" :
            page.indexOf("blog") === 0 ? "assets/img/khmer/banners/blog-banner.webp" : "assets/img/khmer/banners/store-banner.webp";
        var mobileImage = image.replace(".webp", "-mobile.webp");
        banner.style.setProperty("--kh-banner-desktop", "linear-gradient(90deg, rgba(22,29,25,.82), rgba(22,29,25,.28)), url('" + new URL(image, document.baseURI).href + "')");
        banner.style.setProperty("--kh-banner-mobile", "linear-gradient(90deg, rgba(22,29,25,.78), rgba(22,29,25,.42)), url('" + new URL(mobileImage, document.baseURI).href + "')");
        var heading = banner.querySelector("h2, h3, h4");
        if (heading) heading.textContent = pageTitles[page] || "ស្លៀក";
    }

    function populateCategoriesAndPromos() {
        var countsByCategory = [36, 22, 28, 18, 24, 31];
        document.querySelectorAll(".sample-warpper").forEach(function (card, index) {
            var category = store.categories[index % store.categories.length];
            var image = card.querySelector("img");
            var title = card.querySelector("h6");
            var count = card.querySelector("span");
            if (image) {
                image.src = "assets/img/khmer/categories/" + category.slug + ".webp";
                image.alt = "ប្រភេទ " + category.name;
                image.loading = "lazy";
            }
            if (title) title.textContent = category.name;
            if (count) count.textContent = countsByCategory[index % countsByCategory.length] + " មុខ";
        });

        document.querySelectorAll(".product-discount-area .discount").forEach(function (promo) {
            promo.style.backgroundImage = "url('assets/img/khmer/promos/women-collection.webp')";
            promo.style.backgroundSize = "cover";
            promo.style.backgroundPosition = "center";
        });
        document.querySelectorAll(".product-discount-area .deal-area").forEach(function (promo) {
            promo.style.backgroundImage = "url('assets/img/khmer/promos/men-collection.webp')";
            promo.style.backgroundSize = "cover";
            promo.style.backgroundPosition = "center";
        });
        var collectionImages = ["assets/img/khmer/promos/season-collection.webp", "assets/img/khmer/promos/women-collection.webp"];
        document.querySelectorAll(".man-collection-area .collection-area").forEach(function (promo, index) {
            promo.style.backgroundImage = "url('" + collectionImages[index % collectionImages.length] + "')";
        });
        document.querySelectorAll(".man-collection-area .collection-area a").forEach(function (link) {
            link.innerHTML = '<span class="kh-collection-eyebrow">បណ្តុំពិសេស · បញ្ចុះតម្លៃ ៣០%</span><strong>ស្ទីលស្រាល សម្រាប់រាល់ថ្ងៃ</strong>';
            link.href = "shop-grid-page.html";
        });
        document.querySelectorAll('[style*="team-bg"]').forEach(function (promo) {
            promo.style.backgroundImage = "linear-gradient(90deg, rgba(22,29,25,.76), rgba(22,29,25,.34)), url('assets/img/khmer/promos/editorial-full.webp')";
            promo.style.backgroundSize = "cover";
            promo.style.backgroundPosition = "center";
        });
        document.querySelectorAll(".product-discount-area .discount").forEach(function (promo) {
            var eyebrow = promo.querySelector(".discount-detalis span");
            var copy = promo.querySelector(".discount-detalis p");
            if (eyebrow) eyebrow.textContent = "បណ្តុំនារី · បញ្ចុះតម្លៃរហូតដល់ ៣០%";
            if (copy) copy.textContent = "រ៉ូប និងឈុតស្រាល ដែលងាយផ្គូផ្គងសម្រាប់ថ្ងៃធ្វើការ និងថ្ងៃសម្រាក។";
        });
        document.querySelectorAll(".product-discount-area .deal-area").forEach(function (promo) {
            var eyebrow = promo.querySelector(".time-area > p");
            var title = promo.querySelector(".section-title h3");
            var link = promo.querySelector(".dbtn");
            if (eyebrow) eyebrow.textContent = "ការផ្តល់ជូនមានកំណត់";
            if (title) title.textContent = "បណ្តុំបុរសប្រចាំសប្តាហ៍";
            if (link) { link.textContent = "ទិញឥឡូវនេះ"; link.href = "shop-grid-page-3.html"; }
        });
    }

    function localizePageContent() {
        document.querySelectorAll(".product-menu").forEach(function (menu) {
            var buttons = Array.prototype.slice.call(menu.querySelectorAll("button"));
            buttons.forEach(function (button, index) {
                if (index !== 0 && index !== 1 && index !== buttons.length - 1) {
                    if (button.nextElementSibling && button.nextElementSibling.tagName === "HR") button.nextElementSibling.remove();
                    button.remove();
                }
            });
            var remaining = menu.querySelectorAll("button");
            if (remaining[0]) remaining[0].textContent = "ទាំងអស់";
            if (remaining[1]) remaining[1].textContent = "ទំនិញថ្មី";
            if (remaining[2]) remaining[2].textContent = "លក់ដាច់";
        });

        document.querySelectorAll("p").forEach(function (paragraph) {
            var text = paragraph.textContent.replace(/\s+/g, " ").trim();
            if (/[A-Za-z]{3}/.test(text) && text.length > 22 && !/@|USD|SLIEK|Telegram|Facebook/.test(text)) {
                paragraph.textContent = "យើងជ្រើសរើសម៉ូដដែលស្រួលពាក់ ប្រើក្រណាត់មានគុណភាព និងកាត់ដេរយ៉ាងម៉ត់ចត់ សម្រាប់ជីវិតប្រចាំថ្ងៃនៅកម្ពុជា។";
            }
        });

        document.querySelectorAll("input[type='submit']").forEach(function (input) {
            input.value = "ផ្ញើសារ";
        });

        document.querySelectorAll(".artical-text p").forEach(function (quote) {
            quote.textContent = "សាច់ក្រណាត់ត្រជាក់ ស្រួលពាក់ ហើយទំហំត្រូវតាមការណែនាំ។ ការដឹកជញ្ជូនរហ័ស និងកញ្ចប់ក៏ស្អាតផងដែរ។";
        });
        document.querySelectorAll(".author-info").forEach(function (author) {
            var name = author.querySelector("h5");
            var role = author.querySelector("span");
            if (name) name.textContent = "វិសាល មុនី";
            if (role) role.textContent = "អតិថិជន ស្លៀក · ភ្នំពេញ";
        });
        document.querySelectorAll(".artical-area .author-img img, .artical-bg .author-img img").forEach(function (image) {
            image.src = "assets/img/khmer/blog/blog-workwear.webp";
            image.alt = "វិសាល មុនី អតិថិជន ស្លៀក";
            image.loading = "lazy";
        });

        document.querySelectorAll(".cart-table tbody tr").forEach(function (row, index) {
            var product = products[index % products.length];
            var image = row.querySelector(".cart-img img");
            var name = row.querySelector(".cart-description span");
            var description = row.querySelector(".cart-description p");
            var model = row.querySelector(".cart-model span");
            if (image) { image.src = product.image; image.alt = product.name; }
            if (name) name.textContent = product.name;
            if (description) description.textContent = product.category + " · ទំហំ " + displaySizes(product.sizes) + " · ពណ៌ " + product.colors.join(", ");
            if (model) model.textContent = product.id;
            row.querySelectorAll(".cart-price span").forEach(function (price) { price.textContent = money(product.price); });
        });
        var cartTotal = products[0].price + products[1].price;
        document.querySelectorAll(".product-cart .cart-price-area span").forEach(function (total) { total.textContent = money(cartTotal); });
        document.querySelectorAll(".cart-page-area .table-button a").forEach(function (link) {
            if (/បន្តទិញ/.test(link.textContent)) link.href = "shop-grid-page.html";
            if (/បញ្ជាទិញ/.test(link.textContent)) link.href = "checkout-page.html";
        });

        var checkoutProduct = products[0];
        var checkoutLines = document.querySelectorAll(".checkout-product-detalis .product-total li");
        if (checkoutLines.length >= 4) {
            var productName = checkoutLines[0].querySelector("span:first-child");
            var productPrice = checkoutLines[0].querySelector("span:last-child");
            var productSize = checkoutLines[1].querySelector("span:last-child");
            var productColor = checkoutLines[2].querySelector("span:last-child");
            var delivery = checkoutLines[3].querySelector("span:last-child");
            if (productName) productName.textContent = checkoutProduct.name;
            if (productPrice) productPrice.textContent = money(checkoutProduct.price);
            if (productSize) productSize.textContent = checkoutProduct.sizes[1] || checkoutProduct.sizes[0];
            if (productColor) productColor.textContent = checkoutProduct.colors[0];
            if (delivery) delivery.textContent = "$2.00";
            var orderTotal = document.querySelector(".oreder-total .float-right");
            if (orderTotal) orderTotal.textContent = money(checkoutProduct.price + 2);
        }

        var map = document.querySelector(".map-container iframe");
        if (map) {
            map.src = "https://maps.google.com/maps?q=Phnom%20Penh%20Cambodia&t=&z=13&ie=UTF8&iwloc=&output=embed";
            map.title = "ផែនទីទីតាំងហាង ស្លៀក នៅភ្នំពេញ";
            map.loading = "lazy";
        }
        var contactItems = document.querySelectorAll(".contact-info .contact span");
        if (contactItems[0]) contactItems[0].textContent = store.brand.address;
        if (contactItems[1]) contactItems[1].textContent = store.brand.email;
        if (contactItems[2]) contactItems[2].textContent = store.brand.phone;

        if (/^404(?:-page)?\.html$/.test(page)) {
            var notFound = document.querySelector(".page-404-area .container");
            if (notFound) notFound.innerHTML = '<div class="kh-not-found"><p class="kh-error-code">404</p><h1>រកមិនឃើញទំព័រនេះទេ</h1><p>តំណនេះប្រហែលជាត្រូវបានផ្លាស់ប្តូរ ឬលែងមាន។ អ្នកអាចត្រឡប់ទៅទំព័រដើម ឬមើលទំនិញថ្មីៗរបស់យើង។</p><div><a class="b-btn" href="index.html">ត្រឡប់ទៅទំព័រដើម</a><a class="b-btn kh-secondary-btn" href="shop-grid-page.html">មើលទំនិញ</a></div></div>';
        }
    }

    function counts() {
        var cart = JSON.parse(localStorage.getItem("sliek-cart") || "[]");
        var wishlist = JSON.parse(localStorage.getItem("sliek-wishlist") || "[]");
        document.querySelectorAll("[data-cart-count]").forEach(function (node) { node.textContent = cart.length; });
        document.querySelectorAll("[data-wishlist-count]").forEach(function (node) { node.textContent = wishlist.length; });
    }

    var toastTimer;
    function toast(message) {
        var element = document.querySelector(".kh-toast");
        if (!element) {
            element = document.createElement("div");
            element.className = "kh-toast";
            element.setAttribute("role", "status");
            element.setAttribute("aria-live", "polite");
            document.body.appendChild(element);
        }
        element.textContent = message;
        element.classList.add("is-visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { element.classList.remove("is-visible"); }, 2600);
    }

    function addItem(key, product) {
        var items = JSON.parse(localStorage.getItem(key) || "[]");
        if (items.indexOf(product.id) === -1) items.push(product.id);
        localStorage.setItem(key, JSON.stringify(items));
        counts();
    }

    function bindStoreActions() {
        document.addEventListener("click", function (event) {
            var cartLink = event.target.closest(".product-wrapper .cart a, .cart-view .cart a");
            var wishLink = event.target.closest(".product-wrapper .fa-heart, .cart-view .fa-heart");
            if (!cartLink && !wishLink) return;
            event.preventDefault();
            var wrapper = event.target.closest("[data-product-id]");
            var product = products.find(function (item) { return wrapper && item.id === wrapper.getAttribute("data-product-id"); }) || products[0];
            if (cartLink) {
                addItem("sliek-cart", product);
                toast("បានដាក់ “" + product.name + "” ចូលកន្ត្រក។");
            } else {
                addItem("sliek-wishlist", product);
                toast("បានរក្សាទុក “" + product.name + "” ក្នុងបញ្ជីចង់បាន។");
            }
        });
    }

    function bindHeader() {
        var nav = document.querySelector(".kh-main-nav");
        var menuButton = document.querySelector(".kh-menu-toggle");
        var searchButton = document.querySelector("[data-toggle-search]");
        var searchPanel = document.querySelector(".kh-search-panel");
        var searchInput = document.querySelector("#kh-search-input");
        var results = document.querySelector(".kh-search-results");

        if (menuButton && nav) menuButton.addEventListener("click", function () {
            var isOpen = nav.classList.toggle("is-open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });
        if (searchButton && searchPanel) searchButton.addEventListener("click", function () {
            var isOpen = searchPanel.classList.toggle("is-open");
            searchButton.setAttribute("aria-expanded", String(isOpen));
            if (isOpen) searchInput.focus();
        });
        if (searchInput && results) searchInput.addEventListener("input", function () {
            var query = searchInput.value.trim().toLowerCase();
            var matches = query ? products.filter(function (product) {
                return (product.name + " " + product.category + " " + product.id).toLowerCase().indexOf(query) !== -1;
            }).slice(0, 6) : [];
            results.innerHTML = matches.map(function (product) {
                return '<li><a href="shop-detalis-page.html?id=' + product.id.toLowerCase() + '"><span>' + product.name + '</span><strong>' + money(product.price) + '</strong></a></li>';
            }).join("");
            if (query && !matches.length) results.innerHTML = "<li><span class=\"d-block p-3\">រកមិនឃើញទំនិញដែលត្រូវនឹងការស្វែងរកទេ។</span></li>";
        });
        var searchForm = document.querySelector(".kh-search-form");
        if (searchForm) searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var firstResult = results && results.querySelector("a");
            if (firstResult) location.href = firstResult.href;
            else if (searchInput) searchInput.dispatchEvent(new Event("input"));
        });

        var group = page.indexOf("shop") === 0 || /cart|checkout/.test(page) ? "shop" : page.indexOf("blog") === 0 ? "blog" : /about|contact|login|register|404/.test(page) ? "pages" : "home";
        var active = document.querySelector('[data-group="' + group + '"]');
        if (active) { active.classList.add("is-active"); active.setAttribute("aria-current", "page"); }
    }

    function bindForms() {
        document.querySelectorAll("form").forEach(function (form) {
            if (form.classList.contains("kh-search-form")) return;
            var email = form.querySelector("input[type='email']");
            var password = form.querySelector("input[type='password']");
            if (email) email.required = true;
            if (password) password.required = true;
            form.addEventListener("submit", function (event) {
                var action = form.getAttribute("action");
                if (action && action !== "#") return;
                event.preventDefault();
                var oldMessage = form.querySelector(".kh-form-message");
                if (oldMessage) oldMessage.remove();
                var message = document.createElement("p");
                message.className = "kh-form-message";
                if (!form.checkValidity()) {
                    message.classList.add("is-error");
                    message.textContent = "សូមបំពេញព័ត៌មានចាំបាច់ឱ្យបានត្រឹមត្រូវ។";
                    form.reportValidity();
                } else {
                    message.classList.add("is-success");
                    message.textContent = /checkout/.test(page) ? "ការបញ្ជាទិញសាកល្បងត្រូវបានទទួល។ មិនមានការទូទាត់ប្រាក់ពិតទេ។" : "យើងបានទទួលព័ត៌មានរបស់អ្នក ហើយនឹងឆ្លើយតបឆាប់ៗនេះ។";
                    form.reset();
                }
                form.appendChild(message);
            });
        });
    }

    function bindTransactionalPages() {
        document.querySelectorAll(".cart-table tbody tr").forEach(function (row) {
            var remove = row.querySelector(".cart-edit a:last-child");
            if (remove) remove.addEventListener("click", function (event) {
                event.preventDefault();
                row.remove();
                toast("បានដកទំនិញចេញពីកន្ត្រក។");
            });
        });
        var placeOrder = document.querySelector(".checkout-page .table-button a");
        if (placeOrder) placeOrder.addEventListener("click", function (event) {
            event.preventDefault();
            toast("បានទទួលការបញ្ជាទិញសាកល្បង។ មិនមានការទូទាត់ប្រាក់ពិតទេ។");
        });
    }

    function finalizePage() {
        document.documentElement.lang = "km";
        document.title = (pageTitles[page] || "ហាងសម្លៀកបំពាក់") + " — " + store.brand.name;
        document.documentElement.style.setProperty("--store-primary", store.brand.primary);
        document.documentElement.style.setProperty("--store-secondary", store.brand.secondary);
        document.querySelectorAll("a[href='#']").forEach(function (link) {
            if (link.closest(".cart, .social-icon, .pagination, .nav-tabs, .search, .language, .mony") || link.getAttribute("data-toggle")) return;
            var label = link.textContent.replace(/\s+/g, " ").trim();
            if (/shop|buy|discover|ទិញ|មើល/.test(label.toLowerCase())) link.href = "shop-grid-page.html";
        });
        document.querySelectorAll("img").forEach(function (image) {
            if (!image.alt && image.getAttribute("src")) image.alt = "រូបភាពពីហាង " + store.brand.name;
        });
        document.querySelectorAll(".loader").forEach(function (loader) { loader.style.display = "none"; });
    }

    replaceSharedLayout();
    translateText();
    populateHeroes();
    populateProducts();
    populateBlog();
    setPageBanner();
    populateCategoriesAndPromos();
    localizePageContent();
    bindHeader();
    bindStoreActions();
    bindForms();
    bindTransactionalPages();
    counts();
    finalizePage();
}());
