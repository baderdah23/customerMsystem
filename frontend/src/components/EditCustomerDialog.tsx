import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

export interface CustomerData {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string | number;
  gender: string;
  age: number | string;
  country: string;
}

interface EditCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: CustomerData | null;
  onSubmit?: (id: string, data: CustomerData) => void;
}

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

const EditCustomerDialog: React.FC<EditCustomerDialogProps> = ({
  isOpen,
  onClose,
  customer,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CustomerData>({
    first_name: "",
    last_name: "",
    email: "",
    telephone: "",
    gender: "",
    age: "",
    country: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        id: customer?.id,
        first_name: customer.first_name || "",
        last_name: customer.last_name || "",
        email: customer.email || "",
        telephone: customer.telephone || "",
        gender: customer.gender || "",
        age: customer.age || "",
        country: customer.country || "",
      });
    }
  }, [customer]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && formData.id) {
      onSubmit(formData?.id, formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1e2227] border border-[#3a3f47] rounded-xl shadow-2xl overflow-hidden">
        {/* Dialog Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2c313a]">
          <h2 className="text-lg font-semibold text-white">Edit Customer</h2>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#2a2e35] transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Dialog Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 font-medium">
                First Name:
              </label>
              <input
                type="text"
                name="first_name"
                required
                className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 font-medium">
                Last Name:
              </label>
              <input
                type="text"
                name="last_name"
                required
                className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email & Telephone */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 font-medium">
                Email:
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 font-medium">
                Telephone:
              </label>
              <input
                type="tel"
                name="telephone"
                required
                className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]"
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Age & Country */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 font-medium">
                Age:
              </label>
              <input
                type="number"
                name="age"
                required
                className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 font-medium">
                Country:
              </label>
              <select
                name="country"
                required
                className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#3b82f6] cursor-pointer"
                value={formData.country}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select country
                </option>
                {countries.map((country) => (
                  <option key={country} value={country.split(" ")[0]}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm mb-1.5 font-medium">
              Gender:
            </label>
            <div className="relative w-full">
              <select
                name="gender"
                required
                className="w-full bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-2 pr-8 text-sm text-gray-300 focus:outline-none focus:border-[#3b82f6] appearance-none cursor-pointer"
                value={formData.gender}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <IoChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Dialog Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2c313a]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-[#2a2e35] hover:bg-[#343942] rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#3b82f6] hover:bg-[#2563eb] active:scale-95 rounded-md transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerDialog;
