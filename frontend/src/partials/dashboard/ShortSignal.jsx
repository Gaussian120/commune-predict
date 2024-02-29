import React from 'react';
import { useState, useEffect } from 'react';
import { binanceCryptoIcons } from 'binance-icons';

function ShortSignal() {
  var hasBtc = binanceCryptoIcons.has('');
  var btcIcon = binanceCryptoIcons.get('');
  const default_hasBtc = binanceCryptoIcons.has('cfx');
  const default_btcIcon = binanceCryptoIcons.get('cfx');

  return (
    <div className="mt-[20px] mb-[20px] w-[98%] min-h-[250px] mx-auto col-span-full rounded-xl xl:col-span-full bg-white dark:bg-gray-900 shadow-lg
                   rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 flex flex-row justify-between dark:border-slate-700">
        <h2 className="font-semibold text-[32px] text-slate-800 dark:text-slate-300">Short Signal</h2>
        <a className="mt-[10px] font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="/short">
          All
        </a>
      </header>
      <div className="mx-auto py-2 grid grid-cols-1 gap-0">
        <div>
          <ul className="text-[16px] font-semibold grid grid-cols-7 gap-x-2">
            <li className="text-center text-slate-400">No</li>
            <li className="text-slate-400">Pairs</li>
            <li className="text-center text-slate-400">Price</li>
            <li className="text-center text-slate-400">Change</li>
            <li className="text-center text-slate-400">1h high</li>
            <li className="text-center text-slate-400">1h low</li>
            <li className="text-center text-slate-400">Open</li>
          </ul>
        </div>
        <div></div>
        <div></div>
      </div>
      <div className="m-auto w-[95%] h-[3px]  bg-gray-500 mb-[4px]"></div>
      <div>
        <div className="mx-auto py-2 grid grid-cols-1 gap-0">
          <div>
          <h1 className="text-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1 mt-[40px]">
            No Matching Data  😭</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortSignal;