import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition, Combobox } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { BellIcon, MenuIcon, XIcon, UsersIcon } from '@heroicons/react/outline';
import SearchVolumeItem from './components/SearchVolumeItem';
import MainChart from './components/MainChart';
import SideChart from './components/MainChart';
import NewsItem from './components/NewsItem';
import BlogItem from './components/BlogItem';
import CafeItem from './components/CafeItem';
import KinItem from './components/KinItem';
import Footer from './components/Footer';
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { classNames } from '../libs/client/classNames';

export default function Home() {

// const router = useRouter();
// const [savedKeywords, setSavedKeywords] = useState(["사과", "커피", "Twitter", "Samsung", "강남역", "블록체인"]);
// const [typingKeyword, setTypingKeyword] = useState("");
// const filteredKeywords =
//     typingKeyword === ""
//       ? []
//       : savedKeywords?.filter((keyword) => {
//           return keyword?.toLowerCase()?.includes(typingKeyword?.toLowerCase())
//         });

const user = {
    name: 'Anonymous',
    email: 'admin@londonpark.me',
    imageUrl:
        'https://avatars.dicebear.com/api/pixel-art/adminlondonpark.svg',
    };

const navigation = [
    { category: 'kvolume', name: '키워드 검색량' },
    { category: 'news', name: '네이버 뉴스' },
    { category: 'blog', name: '네이버 블로그' },
    { category: 'cafe', name: '네이버 카페' },
    { category: 'kin', name: '네이버 지식in' },
];

const initialCategoryActive = {
    kvolume: false,
    news: false,
    blog: false,
    cafe: false,
    kin: false,
    shop: false,
};

const [categoryActive, setCategoryActive] = useState({
    kvolume: true,
    news: false,
    blog: false,
    cafe: false,
    kin: false,
    shop: false,
});

const [category, setCategory] = useState("kvolume")
const [keyword, setKeyword] = useState("");

const handleSubmitMain = async (e) => {
  e.preventDefault();
  const { mainKeyword } = e.target.elements;
  setKeyword(mainKeyword.value.replace(/\s/g, ''));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const { searchKeyword } = e.target.elements;
    setKeyword(searchKeyword.value.replace(/\s/g, ''));
};

const userNavigation = [
    { name: "나의 프로필", href: "#" },
    { name: "로그인", href: "#" },
];

const { data, error, isValidating } = useSWR(keyword ? `/api/search?keyword=${keyword}` : null);
const { mutate: unboundMutate, cache } = useSWRConfig();

useEffect(() => {
    if (keyword && data && !(!data && !error)) {
      console.log(`current cache key: /api/search?keyword=${keyword}`);
      console.log("<GLOBAL CACHE> CACHE DATA: ", cache.get(`/api/search?keyword=${keyword}`));
    };
}, [data]); 

  return (
    <>
    <Head>
      <title>London Search</title>
    </Head>

    {!keyword && !data

    ?

    <div className="flex items-center justify-center fixed w-full h-full">
      <Image
          className="overflow-hidden max-h-full max-w-full z-auto"
          alt="background-image"
          src="/galaxy.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      <div className="md:w-full mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
        <form onSubmit={handleSubmitMain}>
          <label htmlFor="mainKeyword" className="sr-only" />
          <input 
          className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" 
          type="text" 
          id="mainKeyword" 
          name="mainKeyword" 
          placeholder="키워드 검색"
          spellCheck="false"
          required />
        </form>
      </div>
    </div>

    :
    
    <div>
    <Disclosure as="header" className="bg-gray-800">
    {({ open }) => (
      <>
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
          <div className="relative h-16 flex justify-between">
            <div className="relative z-10 px-2 flex lg:px-0">
              <div className="flex-shrink-0 flex items-center">

                <a href="/">
                <span className="block h-8 w-auto text-indigo-500 font-bold text-xl">LONDON</span>
                </a>
              </div>
            </div>
            <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
              <div className="w-full sm:max-w-xs">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>

                  <form onSubmit={ handleSubmit }>
                      <label htmlFor="searchKeyword" className="sr-only">Search</label>
                      <input
                      id="searchKeyword"
                      name="searchKeyword"
                      className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
                      placeholder="검색 키워드 입력"
                      type="text"
                      spellCheck="false"
                      maxLength="15"
                      required
                      />
                  </form>

                </div>
              </div>
            </div>
            <div className="relative z-10 flex items-center lg:hidden">
              
              {/* Mobile menu button */}
              <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open Menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
              <button
                type="button"
                className="bg-gray-800 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">View Notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="flex-shrink-0 relative ml-4">
                <div>
                  <Menu.Button className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open User Menu</span>
                    <img className="h-8 w-8 rounded-full" src={user?.imageUrl} alt="profile" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                    {userNavigation.map((item, idx) => (
                      <Menu.Item key={idx}>
                        {({ active }) => ( 
                          <a
                          href={item?.href}
                          className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block py-2 px-4 text-sm text-gray-700'
                          )}
                          >
                          {item?.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <nav className="hidden lg:py-2 lg:flex lg:space-x-8" aria-label="Global">
            
            {navigation.map((item, idx) => (
              <button 
              key={idx}
              onClick={() => {
                  setCategory(item?.category);
                  setCategoryActive({...initialCategoryActive, [item?.category]: true});
              }}
              className={classNames(
                  categoryActive[item?.category] ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md py-2 px-3 inline-flex items-center text-sm font-medium'
              )}
              >
                  {item?.name}
              </button>
            ))}
          </nav>
        </div>

        <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
          <div className="pt-2 pb-3 px-2 space-y-1">
            {navigation.map((item, idx) => (

              <Disclosure.Button
                  key={idx}
                  as="button"
                  onClick={() => {
                      setCategory(item?.category);
                      setCategoryActive({...initialCategoryActive, [item?.category]: true});
                  }}
                  className={classNames(
                      categoryActive[item?.category] ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md py-2 px-3 text-base font-medium'
                  )}
                  >
                  {item?.name}
              </Disclosure.Button>

            ))}
          </div>
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="px-4 flex items-center">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user?.imageUrl || "https://avatars.dicebear.com/api/pixel-art/random.svg"} alt="user profile image" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user?.name || "Anonymous"}</div>
                <div className="text-sm font-medium text-gray-400">{user?.email || "No Email"}</div>
              </div>
              <button
                type="button"
                className="ml-auto flex-shrink-0 bg-gray-800 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">View Notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {userNavigation.map((item, idx) => (
                <Disclosure.Button
                  key={idx}
                  as="a"
                  href={item?.href}
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item?.name}
                </Disclosure.Button>
              ))}
            </div>
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
  
  {
  
  data?.kvolumeItems && category === 'kvolume' && !error

  ?

  <div>

      {data?.all_datalab?.map((num) => { return num?.period } )?.length && data?.all_datalab?.map((num) => { return num?.period } )?.length === data?.mobile_datalab?.map((num) => { return num?.period } )?.length 

      ?

      <MainChart 
        keyword={data?.keyword} 
        all_datalab={data?.all_datalab}
        mobile_datalab={data?.mobile_datalab}
        // pc_datalab={data?.pc_datalab}
        all_device_total_count={data?.kvolumeItems?.[0]?.monthlyPcQcCnt + data?.kvolumeItems?.[0]?.monthlyMobileQcCnt}
        mobile_total_count={data?.kvolumeItems?.[0]?.monthlyMobileQcCnt}
        // pc_total_count={data?.kvolumeItems?.[0]?.monthlyPcQcCnt}
      />

      :

      data?.all_datalab?.map((num) => { return num?.period } )?.length

      ?

      <SideChart 
        keyword={data?.keyword} 
        all_datalab={data?.all_datalab}
        all_device_total_count={data?.kvolumeItems?.[0]?.monthlyPcQcCnt + data?.kvolumeItems?.[0]?.monthlyMobileQcCnt}
      />

      :

      null}

      {data?.kvolumeItems?.map((item, idx) => (
      
      <SearchVolumeItem
          key={idx}
          searchDate={data?.searchDate}
          keyword={data?.keyword}
          item={item}
      />

      ))
      }

  </div>

  :

  null

  }

  {
  
  data?.newsItems && category === 'news' && !error

  ?

  <div>
      {data?.newsItems?.map((item, idx) => (
      
      <NewsItem
          key={idx}
          item={item}
      />

      ))
      }
  </div>

  :

  null

  }

  {
  
  data?.blogItems && category === 'blog' && !error

  ?

  <div>
      {data?.blogItems?.map((item, idx) => (
      
      <BlogItem
          key={idx}
          item={item}
      />

      ))
      }
  </div>

  :

  null

  }

  {
  
  data?.cafeItems && category === 'cafe' && !error

  ?

  <div>
      {data?.cafeItems?.map((item, idx) => (
      
      <CafeItem
          key={idx}
          item={item}
      />

      ))
      }
  </div>

  :

  null

  }

  {
  
  data?.kinItems && category === 'kin' && !error

  ?

  <div>
      {data?.kinItems?.map((item, idx) => (
      
      <KinItem
          key={idx}
          item={item}
          keyword={data?.keyword}
          searchDate={data?.searchDate}
      />

      ))
      }
  </div>

  :

  null

  }

  {
  
  data && !isValidating && !error 

  ?

  <Footer /> 

  :

  null

  }
</div>
}
</>
  )
}
