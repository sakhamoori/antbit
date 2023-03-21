/* eslint-disable tailwindcss/no-custom-classname */
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import router from 'next/router';
import type { ReactNode } from 'react';
import { useState } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  session?: any;
};

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const Main = (props: IMainProps) => {
  const supabase = useSupabaseClient();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="w-full px-2 text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto max-w-screen-xl">
        <header className="border-b border-gray-300">
          <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
              <a href="https://antbit.io" className="flex items-center">
                <img
                  src="data:image/svg+xml,<svg width='1242' height='259' viewBox='0 0 1242 259' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M292.337 209.496V197.12C292.337 182.976 297.046 171.189 306.463 161.76C315.88 152.331 327.652 147.616 341.778 147.616H423.002V137.008C423.002 121.685 415.35 114.024 400.047 114.024H306.463V76.8961H414.173C428.299 76.8961 440.07 81.6108 449.488 91.0401C458.905 100.469 463.613 112.256 463.613 126.4V255.464H433.596L426.533 236.016H424.767C422.413 240.259 419.117 244.149 414.879 247.685C405.933 255.228 395.103 259 382.39 259H341.778C327.652 259 315.88 254.285 306.463 244.856C297.046 235.427 292.337 223.64 292.337 209.496ZM352.372 221.872H389.453C400.047 221.872 408.287 218.925 414.173 213.032C420.059 207.139 423.002 198.888 423.002 188.28V181.208H352.372C345.309 181.208 340.247 182.74 337.187 185.805C334.362 188.634 332.949 193.584 332.949 200.656V202.424C332.949 209.496 334.362 214.564 337.187 217.629C340.247 220.458 345.309 221.872 352.372 221.872Z' fill='black'/>
<path d='M492.031 255.464V76.8961H522.048L529.111 96.3441H530.877C533.231 92.3366 536.527 88.5649 540.765 85.0289C549.947 77.2497 560.777 73.3601 573.255 73.3601H619.164C633.29 73.3601 645.061 78.0748 654.479 87.5041C663.896 96.9334 668.604 108.72 668.604 122.864V255.464H627.993V133.472C627.993 118.149 620.341 110.488 605.038 110.488H566.192C555.597 110.488 547.357 113.435 541.471 119.328C535.586 125.221 532.643 133.472 532.643 144.08V255.464H492.031Z' fill='black'/>
<path d='M714.39 205.96V114.024H680.84V76.8961H716.155L730.281 25.6241H755.001V76.8961H815.036V101.648L802.676 114.024H755.001V195.352C755.001 210.675 762.653 218.336 777.956 218.336H820.334V255.464H763.83C749.704 255.464 737.933 250.749 728.515 241.32C719.098 231.891 714.39 220.104 714.39 205.96Z' fill='black'/>
<path d='M841.467 255.464V13.2481H882.079V94.5761H883.845C886.67 90.3329 889.731 86.7969 893.027 83.9681C901.973 76.8961 912.45 73.3601 924.457 73.3601H972.132C986.258 73.3601 998.029 78.0748 1007.45 87.5041C1016.86 96.9334 1021.57 108.72 1021.57 122.864V205.96C1021.57 220.104 1016.86 231.891 1007.45 241.32C998.029 250.749 986.258 255.464 972.132 255.464H841.467ZM882.079 218.336H958.006C973.309 218.336 980.961 210.675 980.961 195.352V133.472C980.961 118.149 973.309 110.488 958.006 110.488H915.628C905.034 110.488 896.794 113.435 890.908 119.328C885.022 125.221 882.079 133.472 882.079 144.08V218.336Z' fill='black'/>
<path d='M1047.89 255.464V76.8961H1088.51V255.464H1047.89ZM1047.89 52.1441V6.17613H1088.51V52.1441H1047.89Z' fill='black'/>
<path d='M1136.06 205.96V114.024H1102.51V76.8961H1137.82L1151.95 25.6241H1176.67V76.8961H1236.7V101.648L1224.34 114.024H1176.67V195.352C1176.67 210.675 1184.32 218.336 1199.62 218.336H1242V255.464H1185.5C1171.37 255.464 1159.6 250.749 1150.18 241.32C1140.76 231.891 1136.06 220.104 1136.06 205.96Z' fill='black'/>
<path d='M256.824 147.861L236.705 184.392C235.375 186.806 232.841 188.306 230.088 188.308C227.324 188.31 224.78 186.803 223.452 184.377L193.118 128.993C192.23 127.371 191.121 125.88 189.825 124.563C186.059 120.736 180.917 118.584 175.552 118.587L86.2915 118.647C80.7041 118.651 75.3908 121.072 71.7175 125.288C70.9393 126.181 70.2446 127.144 69.642 128.164L38.1038 181.562C36.6806 183.971 34.0931 185.45 31.2971 185.452C28.5433 185.454 25.9865 184.022 24.5462 181.672L3.95588 148.073C1.37239 143.857 0.0033299 139.008 6.0665e-06 134.062C-0.00324167 129.229 1.29759 124.485 3.76501 120.331L69.5689 9.55648C70.1671 8.54949 70.8551 7.59873 71.6244 6.71585C75.3062 2.49033 80.6319 0.0637764 86.2323 0.0600032L175.286 4.64524e-06C180.771 -0.00369016 186.027 2.19688 189.876 6.10817C191.087 7.33859 192.137 8.7174 193.003 10.2118L256.524 119.904C259.027 124.226 260.346 129.133 260.35 134.129C260.353 138.932 259.14 143.656 256.824 147.861Z' fill='black'/>
<path d='M209.235 227.8L191.127 254.076C189.393 256.592 186.537 258.095 183.484 258.097C180.077 258.099 176.942 256.234 175.314 253.237L147.113 201.319C145.305 198.159 141.946 196.21 138.309 196.212L124.342 196.222C120.696 196.224 117.329 198.176 115.511 201.34L87.4738 252.981C85.7396 256.175 82.4003 258.165 78.7693 258.167C75.5459 258.169 72.5225 256.602 70.6632 253.966L52.1951 227.778C50.6013 225.518 49.7447 222.819 49.7428 220.053C49.7412 217.618 50.4014 215.23 51.6527 213.143L86.7969 154.522C89.5627 150.621 94.0436 148.302 98.8218 148.298L167.15 148.252C171.58 148.249 175.675 150.617 177.886 154.461L209.988 213.073C211.12 215.14 211.714 217.459 211.716 219.816C211.718 222.668 210.852 225.453 209.235 227.8Z' fill='black'/>
</svg>"
                  className="mr-3 h-6 sm:h-9"
                  alt="Antbit"
                />
              </a>
              <div className="flex items-center md:order-2">
                {props.session ? (
                  <button
                    type="button"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.push('/');
                    }}
                  >
                    Sign out
                  </button>
                ) : (
                  <button type="button" onClick={() => router.push('/')}>
                    Sign in
                  </button>
                )}
              </div>
              <div
                className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
                id="mobile-menu-2"
              >
                <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
                  <li>
                    <Link
                      href="#"
                      className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="navbar-end">
                    <WalletMultiButtonDynamic />
                  </li>
                </ul>
                <label
                  htmlFor="my-drawer"
                  className="btn-gh mr-6 items-center justify-between md:hidden"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                >
                  <div className="HAMBURGER-ICON ml-5 space-y-2.5">
                    <div
                      className={`h-0.5 w-8 bg-purple-600 ${
                        isNavOpen ? 'hidden' : ''
                      }`}
                    />
                    <div
                      className={`h-0.5 w-8 bg-purple-600 ${
                        isNavOpen ? 'hidden' : ''
                      }`}
                    />
                    <div
                      className={`h-0.5 w-8 bg-purple-600 ${
                        isNavOpen ? 'hidden' : ''
                      }`}
                    />
                  </div>
                  <div
                    className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${
                      isNavOpen ? '' : 'hidden'
                    }`}
                    style={{ transform: 'rotate(45deg)' }}
                  ></div>
                  <div
                    className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${
                      isNavOpen ? '' : 'hidden'
                    }`}
                    style={{ transform: 'rotate(135deg)' }}
                  ></div>
                </label>
              </div>
            </div>
          </nav>
        </header>

        <main className="content py-5 text-xl">{props.children}</main>
        {/* <footer className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:flex md:items-center md:justify-between md:p-6">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2023{' '}
            <a href="#" className="hover:underline">
              AntBit
            </a>
            . All Rights Reserved.
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </footer> */}
      </div>
    </div>
  );
};

export { Main };
