import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { toast } from "../context/ToastContext";
import { API_URL } from "../config/api";

const countries = [
  "Afghanistan  أفغانستان  ــــ ",
  "Albania ألبانيا  ــــ ",
  "Algeria  الجزائر  ــــ ",
  "Andorra أندورا  ــــ ",
  "Angola  أنغولا  ــــ ",
  "Antigua and Barbuda أنتيغوا وبربودا  ــــ ",
  "Argentina الأرجنتين  ــــ ",
  "Armenia أرمينيا  ــــ ",
  "Australia أستراليا  ــــ ",
  "Austria النمسا  ــــ ",
  "Azerbaijan أذربيجان  ــــ ",
  "Bahamas جزر البهاما  ــــ ",
  "Bahrain البحرين  ــــ ",
  "Bangladesh بنغلاديش  ــــ ",
  "Barbados بربادوس  ــــ ",
  "Belarus بيلاروسيا  ــــ ",
  "Belgium بلجيكا  ــــ ",
  "Belize بليز  ــــ ",
  "Benin بنين  ــــ ",
  "Bhutan بوتان  ــــ ",
  "Bolivia بوليفيا  ــــ ",
  "Bosnia and Herzegovina البوسنة والهرسك  ــــ ",
  "Botswana بوتسوانا  ــــ ",
  "Brazil البرازيل  ــــ ",
  "Brunei بروناي  ــــ ",
  "Bulgaria بلغاريا  ــــ ",
  "Burkina Faso بوركينا فاسو  ــــ ",
  "Burundi بوروندي  ــــ ",
  "Cabo Verde الرأس الأخضر  ــــ ",
  "Cambodia كمبوديا  ــــ ",
  "Cameroon الكاميرون  ــــ ",
  "Canada كندا  ــــ ",
  "Central African Republic جمهورية أفريقيا الوسطى  ــــ ",
  "Chad تشاد  ــــ ",
  "Chile تشيلي  ــــ ",
  "China الصين  ــــ ",
  "Colombia كولومبيا  ــــ ",
  "Comoros جزر القمر  ــــ ",
  "Congo الكونغو  ــــ ",
  "Costa Rica كوستاريكا  ــــ ",
  "Croatia كرواتيا  ــــ ",
  "Cuba كوبا  ــــ ",
  "Cyprus قبرص  ــــ ",
  "Czechia التشيك  ــــ ",
  "Democratic Republic of the Congo جمهورية الكونغو الديمقراطية  ــــ ",
  "Denmark الدنمارك  ــــ ",
  "Djibouti جيبوتي  ــــ ",
  "Dominica دومينيكا  ــــ ",
  "Dominican Republic جمهورية الدومينيكان  ــــ ",
  "Ecuador الإكوادور  ــــ ",
  "Egypt مصر  ــــ ",
  "El Salvador السلفادور  ــــ ",
  "Equatorial Guinea غينيا الاستوائية  ــــ ",
  "Eritrea إريتريا  ــــ ",
  "Estonia إستونيا  ــــ ",
  "Eswatini إسواتيني  ــــ ",
  "Ethiopia إثيوبيا  ــــ ",
  "Fiji فيجي  ــــ ",
  "Finland فنلندا  ــــ ",
  "France فرنسا  ــــ ",
  "Gabon الغابون  ــــ ",
  "Gambia غامبيا  ــــ ",
  "Georgia جورجيا  ــــ ",
  "Germany ألمانيا  ــــ ",
  "Ghana غانا  ــــ ",
  "Greece اليونان  ــــ ",
  "Grenada غرينادا  ــــ ",
  "Guatemala غواتيمالا  ــــ ",
  "Guinea غينيا  ــــ ",
  "Guinea-Bissau غينيا بيساو  ــــ ",
  "Guyana غيانا  ــــ ",
  "Haiti هايتي  ــــ ",
  "Honduras هندوراس  ــــ ",
  "Hungary المجر  ــــ ",
  "Iceland آيسلندا  ــــ ",
  "India الهند  ــــ ",
  "Indonesia إندونيسيا  ــــ ",
  "Iran إيران  ــــ ",
  "Iraq العراق  ــــ ",
  "Ireland أيرلندا  ــــ ",
  "Italy إيطاليا  ــــ ",
  "Jamaica جامايكا  ــــ ",
  "Japan اليابان  ــــ ",
  "Jordan الأردن  ــــ ",
  "Kazakhstan كازاخستان  ــــ ",
  "Kenya كينيا  ــــ ",
  "Kiribati كيريباتي  ــــ ",
  "Kuwait الكويت  ــــ ",
  "Kyrgyzstan قيرغيزستان  ــــ ",
  "Laos لاوس  ــــ ",
  "Latvia لاتفيا  ــــ ",
  "Lebanon لبنان  ــــ ",
  "Lesotho ليسوتو  ــــ ",
  "Liberia ليبيريا  ــــ ",
  "Libya ليبيا  ــــ ",
  "Liechtenstein ليختنشتاين  ــــ ",
  "Lithuania ليتوانيا  ــــ ",
  "Luxembourg لوكسمبورغ  ــــ ",
  "Madagascar مدغشقر  ــــ ",
  "Malawi مالاوي  ــــ ",
  "Malaysia ماليزيا  ــــ ",
  "Maldives المالديف  ــــ ",
  "Mali مالي  ــــ ",
  "Malta مالطا  ــــ ",
  "Marshall Islands جزر مارشال  ــــ ",
  "Mauritania موريتانيا  ــــ ",
  "Mauritius موريشيوس  ــــ ",
  "Mexico المكسيك  ــــ ",
  "Micronesia ميكرونيزيا  ــــ ",
  "Moldova مولدوفا  ــــ ",
  "Monaco موناكو  ــــ ",
  "Mongolia منغوليا  ــــ ",
  "Montenegro الجبل الأسود  ــــ ",
  "Morocco المغرب  ــــ ",
  "Mozambique موزمبيق  ــــ ",
  "Myanmar ميانمار  ــــ ",
  "Namibia ناميبيا  ــــ ",
  "Nauru ناورو  ــــ ",
  "Nepal نيبال  ــــ ",
  "Netherlands هولندا  ــــ ",
  "New Zealand نيوزيلندا  ــــ ",
  "Nicaragua نيكاراغوا  ــــ ",
  "Niger النيجر  ــــ ",
  "Nigeria نيجيريا  ــــ ",
  "North Korea كوريا الشمالية  ــــ ",
  "North Macedonia مقدونيا الشمالية  ــــ ",
  "Norway النرويج  ــــ ",
  "Oman عُمان  ــــ ",
  "Pakistan باكستان  ــــ ",
  "Palau بالاو  ــــ ",
  "Palestine فلسطين  ــــ ",
  "Panama بنما  ــــ ",
  "Papua New Guinea بابوا غينيا الجديدة  ــــ ",
  "Paraguay باراغواي  ــــ ",
  "Peru بيرو  ــــ ",
  "Philippines الفلبين  ــــ ",
  "Poland بولندا  ــــ ",
  "Portugal البرتغال  ــــ ",
  "Qatar قطر  ــــ ",
  "Romania رومانيا  ــــ ",
  "Russia روسيا  ــــ ",
  "Rwanda رواندا  ــــ ",
  "Saint Kitts and Nevis سانت كيتس ونيفيس  ــــ ",
  "Saint Lucia سانت لوسيا  ــــ ",
  "Saint Vincent and the Grenadines سانت فنسنت والغرينادين  ــــ ",
  "Samoa ساموا  ــــ ",
  "San Marino سان مارينو  ــــ ",
  "Sao Tome and Principe ساو تومي وبرينسيبي  ــــ ",
  "Saudi Arabia المملكة العربية السعودية  ــــ ",
  "Senegal السنغال  ــــ ",
  "Serbia صربيا  ــــ ",
  "Seychelles سيشل  ــــ ",
  "Sierra Leone سيراليون  ــــ ",
  "Singapore سنغافورة  ــــ ",
  "Slovakia سلوفاكيا  ــــ ",
  "Slovenia سلوفينيا  ــــ ",
  "Solomon Islands جزر سليمان  ــــ ",
  "Somalia الصومال  ــــ ",
  "South Africa جنوب أفريقيا  ــــ ",
  "South Korea كوريا الجنوبية  ــــ ",
  "South Sudan جنوب السودان  ــــ ",
  "Spain إسبانيا  ــــ ",
  "Sri Lanka سريلانكا  ــــ ",
  "Sudan السودان  ــــ ",
  "Suriname سورينام  ــــ ",
  "Sweden السويد  ــــ ",
  "Switzerland سويسرا  ــــ ",
  "Syria سوريا  ــــ ",
  "Tajikistan طاجيكستان  ــــ ",
  "Tanzania تنزانيا  ــــ ",
  "Thailand تايلاند  ــــ ",
  "Timor-Leste تيمور الشرقية  ــــ ",
  "Togo توغو  ــــ ",
  "Tonga تونغا  ــــ ",
  "Trinidad and Tobago ترينيداد وتوباغو  ــــ ",
  "Tunisia تونس  ــــ ",
  "Turkey تركيا  ــــ ",
  "Turkmenistan تركمانستان  ــــ ",
  "Tuvalu توفالو  ــــ ",
  "Uganda أوغندا  ــــ ",
  "Ukraine أوكرانيا  ــــ ",
  "United Arab Emirates الإمارات العربية المتحدة  ــــ ",
  "United Kingdom المملكة المتحدة  ــــ ",
  "United States الولايات المتحدة  ــــ ",
  "Uruguay أوروغواي  ــــ ",
  "Uzbekistan أوزبكستان  ــــ ",
  "Vanuatu فانواتو  ــــ ",
  "Vatican City مدينة الفاتيكان  ــــ ",
  "Venezuela فنزويلا  ــــ ",
  "Vietnam فيتنام  ــــ ",
  "Yemen اليمن  ــــ ",
  "Zambia زامبيا  ــــ ",
  "Zimbabwe زيمبابوي  ــــ ",
];

const AddCustomerPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    telephone: 0,
    gender: "",
    age: 0,
    country: "",
  });

  const sendDate = async () => {
    try {
      const res = await fetch(`${API_URL}/customers`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw Error(err.message);
      }

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        telephone: 0,
        gender: "",
        age: 0,
        country: "",
      });

      const result = await res.json();
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendDate();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl">
      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <label className="block text-gray-300 text-sm mb-1.5">
            First Name:
          </label>
          <input
            type="text"
            name="first_name"
            className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#4a5568]"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-1.5">
            Last Name:
          </label>
          <input
            type="text"
            name="last_name"
            className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#4a5568]"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Email & Telephone */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <label className="block text-gray-300 text-sm mb-1.5">Email:</label>
          <input
            type="email"
            name="email"
            className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#4a5568]"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-1.5">
            Telephone:
          </label>
          <input
            type="tel"
            name="telephone"
            className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#4a5568]"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Age */}
      <div className="mb-5">
        <label className="block text-gray-300 text-sm mb-1.5">Age:</label>
        <input
          type="number"
          name="age"
          className="w-full max-w-[calc(50%-12px)] bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#4a5568]"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      {/* Country */}
      <div className="mb-5">
        <label className="block text-gray-300 text-sm mb-1.5">Country:</label>
        <select
          name="country"
          className="w-full max-w-[calc(50%-12px)] bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#4a5568]"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option disabled value="">
            Select your country
          </option>
          {countries.map((country) => (
            <option key={country} value={country.split(" ")[0]}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm mb-1.5">Gender:</label>
        <div className="relative w-full max-w-[calc(50%-12px)]">
          <select
            name="gender"
            className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 pr-8 text-sm text-gray-500 focus:outline-none focus:border-[#4a5568] appearance-none cursor-pointer"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <IoChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white text-sm font-medium px-5 py-2 rounded-md transition-all"
      >
        Submit
      </button>
    </form>
  );
};

export default AddCustomerPage;
