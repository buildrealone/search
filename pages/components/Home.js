import { Fragment, useState, useEffect } from 'react'
import { UsersIcon } from '@heroicons/react/outline'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { useRouter } from "next/router";
import Image from 'next/image';
import { classNames } from '../../libs/client/classNames';

export default function Home() {
    
  const [savedKeywords, setSavedKeywords] = useState(["사과", "커피", "Twitter", "Samsung", "강남역", "블록체인"]);
  const [keyword, setKeyword] = useState("");
  const [typingKeyword, setTypingKeyword] = useState("");
  const router = useRouter();

  const filteredKeywords =
    typingKeyword === ""
      ? []
      : savedKeywords.filter((keyword) => {
          return keyword?.toLowerCase()?.includes(typingKeyword?.toLowerCase())
        })

  return (
    <div className="flex items-center justify-center fixed w-full h-full">
    <Image
        className="overflow-hidden max-h-full max-w-full z-auto"
        alt="background-image"
        src="/space.webp"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    <div className="w-full">
    <Transition.Root show={true} as={Fragment} appear>
      <div className="relative">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* fixed inset-0 */}
          <div className="bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        {/* fixed inset-0 */}
        <div className="z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <form action="/search" method="post">
              <Combobox>
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="검색하기"
                  onChange={(event) => setTypingKeyword(event.target.value)}
                />

                {filteredKeywords?.length > 0 && (
                  <Combobox.Options
                    static
                    className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >

                    {filteredKeywords?.map((keyword, idx) => (
                      <Combobox.Option
                        key={idx}
                        value={keyword}
                        className={({ active }) =>
                          classNames(
                            'cursor-default select-none rounded-md px-4 py-2',
                            active && 'bg-indigo-500 text-white'
                          )
                        }
                      >
                        {keyword}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {typingKeyword !== "" && filteredKeywords?.length === 0 && (
                  <div className="py-14 px-4 text-center sm:px-14">
                    <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                    <p className="mt-4 text-sm text-gray-900">등록되지 않은 검색어입니다.</p>
                  </div>
                )}
              </Combobox>
              </form>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition.Root>
    </div>
    </div>
  )
}
