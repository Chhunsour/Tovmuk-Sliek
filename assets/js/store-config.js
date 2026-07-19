(function () {
    "use strict";

    window.MOLY_STORE = {
        brand: {
            name: "ស្លៀក",
            latinName: "SLIEK",
            tagline: "សម្លៀកបំពាក់សម័យថ្មី សម្រាប់ជីវិតនៅកម្ពុជា",
            primary: "#b5442f",
            secondary: "#1f2924",
            phone: "+855 12 678 495",
            telegram: "https://t.me/sliekcambodia",
            facebook: "https://facebook.com/sliekcambodia",
            address: "ផ្ទះលេខ ២៤០ មហាវិថីព្រះមុនីវង្ស ភ្នំពេញ",
            email: "hello@sliek.store"
        },
        banners: [
            {
                eyebrow: "បណ្តុំថ្មី ឆ្នាំ ២០២៦",
                title: "ស្រួលស្លៀក ស្អាតគ្រប់ថ្ងៃ",
                description: "ក្រណាត់ស្រាល ត្រជាក់ និងម៉ូដសមស្របនឹងអាកាសធាតុកម្ពុជា។",
                image: "assets/img/khmer/hero/hero-women-desktop.webp"
            },
            {
                eyebrow: "បណ្តុំបុរស",
                title: "រូបរាងសាមញ្ញ តែមានស្ទីល",
                description: "អាវ និងខោដែលអាចពាក់ពីការងាររហូតដល់ចុងសប្តាហ៍។",
                image: "assets/img/khmer/hero/hero-men-desktop.webp"
            },
            {
                eyebrow: "ជ្រើសរើសប្រចាំរដូវ",
                title: "ពណ៌ធម្មជាតិ សម្រាប់ទីក្រុង",
                description: "បណ្តុំមានចំនួនកំណត់ ផលិតដោយយកចិត្តទុកដាក់លើផាសុកភាព។",
                image: "assets/img/khmer/hero/hero-collection-desktop.webp"
            }
        ],
        categories: [
            { name: "អាវយឺត", slug: "tshirts" },
            { name: "អាវក្រៅ", slug: "jackets" },
            { name: "ខោជីន", slug: "jeans" },
            { name: "រ៉ូបនារី", slug: "dresses" },
            { name: "ស្បែកជើង", slug: "shoes" },
            { name: "កាបូប និងគ្រឿងបន្ថែម", slug: "accessories" }
        ],
        products: [
            { id: "SLK-001", name: "អាវយឺតកប្បាស អង្គរ", category: "អាវយឺត", price: 18, originalPrice: 24, colors: ["ខ្មៅ", "ស"], sizes: ["S", "M", "L", "XL"], stock: 18, image: "assets/img/khmer/products/sliek-01.webp" },
            { id: "SLK-002", name: "អាវយឺតស្រាល ពន្លឺព្រឹក", category: "អាវយឺត", price: 16, originalPrice: 20, colors: ["ក្រែម", "ត្នោត"], sizes: ["S", "M", "L"], stock: 12, image: "assets/img/khmer/products/sliek-02.webp" },
            { id: "SLK-003", name: "អាវប៉ូឡូ ភ្នំពេញ", category: "អាវបុរស", price: 26, originalPrice: 32, colors: ["បៃតង", "ខ្មៅ"], sizes: ["M", "L", "XL"], stock: 9, image: "assets/img/khmer/products/sliek-03.webp" },
            { id: "SLK-004", name: "អាវសាច់ក្រណាត់ ទន្លេ", category: "អាវបុរស", price: 29, originalPrice: 36, colors: ["ខៀវ", "ស"], sizes: ["M", "L", "XL"], stock: 14, image: "assets/img/khmer/products/sliek-04.webp" },
            { id: "SLK-005", name: "អាវក្រៅស្រាល មេគង្គ", category: "អាវក្រៅ", price: 42, originalPrice: 54, colors: ["អូលីវ", "ខ្មៅ"], sizes: ["M", "L", "XL"], stock: 7, image: "assets/img/khmer/products/sliek-05.webp" },
            { id: "SLK-006", name: "អាវក្រៅខ្លី ចតុមុខ", category: "អាវក្រៅ", price: 48, originalPrice: 60, colors: ["ត្នោត", "ក្រែម"], sizes: ["S", "M", "L"], stock: 6, image: "assets/img/khmer/products/sliek-06.webp" },
            { id: "SLK-007", name: "ខោជីនត្រង់ បាសាក់", category: "ខោជីន", price: 34, originalPrice: 42, colors: ["ខៀវចាស់"], sizes: ["28", "30", "32", "34"], stock: 20, image: "assets/img/khmer/products/sliek-07.webp" },
            { id: "SLK-008", name: "ខោជីនទូលាយ សែនសុខ", category: "ខោជីន", price: 36, originalPrice: 45, colors: ["ខៀវស្រាល"], sizes: ["26", "28", "30", "32"], stock: 16, image: "assets/img/khmer/products/sliek-08.webp" },
            { id: "SLK-009", name: "ខោកប្បាសប្រចាំថ្ងៃ", category: "ខោបុរស", price: 28, originalPrice: 35, colors: ["ខាគី", "ខ្មៅ"], sizes: ["30", "32", "34", "36"], stock: 11, image: "assets/img/khmer/products/sliek-09.webp" },
            { id: "SLK-010", name: "ខោនារីចង្កេះខ្ពស់", category: "ខោនារី", price: 27, originalPrice: 34, colors: ["ខ្មៅ", "ក្រែម"], sizes: ["S", "M", "L"], stock: 8, image: "assets/img/khmer/products/sliek-10.webp" },
            { id: "SLK-011", name: "រ៉ូបវែង ផ្កាម្លិះ", category: "រ៉ូបនារី", price: 39, originalPrice: 49, colors: ["ក្រែម", "ផ្កាឈូក"], sizes: ["S", "M", "L"], stock: 10, image: "assets/img/khmer/products/sliek-11.webp" },
            { id: "SLK-012", name: "រ៉ូបខ្លី រាត្រីភ្នំពេញ", category: "រ៉ូបនារី", price: 44, originalPrice: 55, colors: ["ខ្មៅ", "ក្រហមចាស់"], sizes: ["S", "M", "L"], stock: 5, image: "assets/img/khmer/products/sliek-12.webp" },
            { id: "SLK-013", name: "ឈុតនារី ពន្លកថ្មី", category: "សម្លៀកបំពាក់នារី", price: 52, originalPrice: 65, colors: ["បៃតងស្រាល"], sizes: ["S", "M", "L"], stock: 7, image: "assets/img/khmer/products/sliek-13.webp" },
            { id: "SLK-014", name: "អាវនារី ដៃទន់", category: "សម្លៀកបំពាក់នារី", price: 24, originalPrice: 30, colors: ["ស", "ខៀវស្រាល"], sizes: ["S", "M", "L", "XL"], stock: 15, image: "assets/img/khmer/products/sliek-14.webp" },
            { id: "SLK-015", name: "ស្បែកជើងស សម្រាប់រាល់ថ្ងៃ", category: "ស្បែកជើង", price: 38, originalPrice: 46, colors: ["ស"], sizes: ["36", "37", "38", "39", "40"], stock: 13, image: "assets/img/khmer/products/sliek-15.webp" },
            { id: "SLK-016", name: "ស្បែកជើងស្បែក ព្រះនរោត្តម", category: "ស្បែកជើង", price: 58, originalPrice: 70, colors: ["ត្នោត", "ខ្មៅ"], sizes: ["39", "40", "41", "42", "43"], stock: 6, image: "assets/img/khmer/products/sliek-16.webp" },
            { id: "SLK-017", name: "ស្បែកជើងផ្ទាត់ កោះរ៉ុង", category: "ស្បែកជើង", price: 22, originalPrice: 28, colors: ["ត្នោត"], sizes: ["36", "37", "38", "39"], stock: 19, image: "assets/img/khmer/products/sliek-17.webp" },
            { id: "SLK-018", name: "កាបូបស្មា ចំប៉ី", category: "កាបូប", price: 32, originalPrice: 40, colors: ["ត្នោត", "ខ្មៅ"], sizes: ["One size"], stock: 9, image: "assets/img/khmer/products/sliek-18.webp" },
            { id: "SLK-019", name: "កាបូបក្រណាត់ ផ្សារថ្មី", category: "កាបូប", price: 14, originalPrice: 18, colors: ["ក្រែម"], sizes: ["One size"], stock: 24, image: "assets/img/khmer/products/sliek-19.webp" },
            { id: "SLK-020", name: "កាបូបដៃ សុវណ្ណ", category: "កាបូប", price: 46, originalPrice: 58, colors: ["ក្រហមចាស់", "ខ្មៅ"], sizes: ["One size"], stock: 4, image: "assets/img/khmer/products/sliek-20.webp" },
            { id: "SLK-021", name: "មួកប៉ាក់ អក្សរខ្មែរ", category: "គ្រឿងបន្ថែម", price: 15, originalPrice: 19, colors: ["ខ្មៅ", "ក្រែម"], sizes: ["One size"], stock: 17, image: "assets/img/khmer/products/sliek-21.webp" },
            { id: "SLK-022", name: "ក្រមាសូត្រ សៀមរាប", category: "គ្រឿងបន្ថែម", price: 21, originalPrice: 28, colors: ["ក្រហម", "ខៀវ"], sizes: ["One size"], stock: 10, image: "assets/img/khmer/products/sliek-22.webp" },
            { id: "SLK-023", name: "ខ្សែក្រវាត់ស្បែក កំពត", category: "គ្រឿងបន្ថែម", price: 20, originalPrice: 25, colors: ["ត្នោត", "ខ្មៅ"], sizes: ["M", "L"], stock: 12, image: "assets/img/khmer/products/sliek-23.webp" },
            { id: "SLK-024", name: "វ៉ែនតាពន្លឺថ្ងៃ បូកគោ", category: "គ្រឿងបន្ថែម", price: 25, originalPrice: 31, colors: ["ខ្មៅ"], sizes: ["One size"], stock: 8, image: "assets/img/khmer/products/sliek-24.webp" }
        ],
        blogPosts: [
            { title: "របៀបជ្រើសក្រណាត់សម្រាប់អាកាសធាតុក្តៅ", date: "១៤ កក្កដា ២០២៦", image: "assets/img/khmer/blog/blog-fabric.webp" },
            { title: "៥ របៀបផ្គូផ្គងអាវយឺតឱ្យមើលទៅស្អាត", date: "០៦ កក្កដា ២០២៦", image: "assets/img/khmer/blog/blog-tshirt.webp" },
            { title: "សម្លៀកបំពាក់ការងារដែលស្រួលពាក់ពេញមួយថ្ងៃ", date: "២៨ មិថុនា ២០២៦", image: "assets/img/khmer/blog/blog-workwear.webp" },
            { title: "ថែទាំខោជីនឱ្យនៅស្អាត និងប្រើបានយូរ", date: "១៩ មិថុនា ២០២៦", image: "assets/img/khmer/blog/blog-denim.webp" },
            { title: "ពណ៌ធម្មជាតិដែលងាយផ្គូផ្គងក្នុងទូខោអាវ", date: "១០ មិថុនា ២០២៦", image: "assets/img/khmer/blog/blog-colors.webp" },
            { title: "មគ្គុទ្ទេសក៍ជ្រើសទំហំសម្លៀកបំពាក់តាមអនឡាញ", date: "០១ មិថុនា ២០២៦", image: "assets/img/khmer/blog/blog-sizing.webp" }
        ]
    };
}());
