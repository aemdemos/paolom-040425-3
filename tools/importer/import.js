/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columnsThreeColumns1Parser from './parsers/columnsThreeColumns1.js';
import hero3Parser from './parsers/hero3.js';
import hero4Parser from './parsers/hero4.js';
import columns5Parser from './parsers/columns5.js';
import cardsNoImages6Parser from './parsers/cardsNoImages6.js';
import hero7Parser from './parsers/hero7.js';
import accordion8Parser from './parsers/accordion8.js';
import tableNoHeader9Parser from './parsers/tableNoHeader9.js';
import hero10Parser from './parsers/hero10.js';
import cardsNoImages11Parser from './parsers/cardsNoImages11.js';
import cardsNoImages12Parser from './parsers/cardsNoImages12.js';
import columnsThreeColumns13Parser from './parsers/columnsThreeColumns13.js';
import hero14Parser from './parsers/hero14.js';
import columnsThreeColumns16Parser from './parsers/columnsThreeColumns16.js';
import hero17Parser from './parsers/hero17.js';
import tableNoHeader18Parser from './parsers/tableNoHeader18.js';
import carousel19Parser from './parsers/carousel19.js';
import columnsThreeColumns21Parser from './parsers/columnsThreeColumns21.js';
import cards22Parser from './parsers/cards22.js';
import columnsThreeColumns23Parser from './parsers/columnsThreeColumns23.js';
import tableStripedBordered24Parser from './parsers/tableStripedBordered24.js';
import columnsThreeColumns25Parser from './parsers/columnsThreeColumns25.js';
import cards27Parser from './parsers/cards27.js';
import tableNoHeader28Parser from './parsers/tableNoHeader28.js';
import cardsNoImages29Parser from './parsers/cardsNoImages29.js';
import columns30Parser from './parsers/columns30.js';
import hero31Parser from './parsers/hero31.js';
import hero32Parser from './parsers/hero32.js';
import video33Parser from './parsers/video33.js';
import cardsNoImages35Parser from './parsers/cardsNoImages35.js';
import embedVideo36Parser from './parsers/embedVideo36.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columnsThreeColumns1: columnsThreeColumns1Parser,
  hero3: hero3Parser,
  hero4: hero4Parser,
  columns5: columns5Parser,
  cardsNoImages6: cardsNoImages6Parser,
  hero7: hero7Parser,
  accordion8: accordion8Parser,
  tableNoHeader9: tableNoHeader9Parser,
  hero10: hero10Parser,
  cardsNoImages11: cardsNoImages11Parser,
  cardsNoImages12: cardsNoImages12Parser,
  columnsThreeColumns13: columnsThreeColumns13Parser,
  hero14: hero14Parser,
  columnsThreeColumns16: columnsThreeColumns16Parser,
  hero17: hero17Parser,
  tableNoHeader18: tableNoHeader18Parser,
  carousel19: carousel19Parser,
  columnsThreeColumns21: columnsThreeColumns21Parser,
  cards22: cards22Parser,
  columnsThreeColumns23: columnsThreeColumns23Parser,
  tableStripedBordered24: tableStripedBordered24Parser,
  columnsThreeColumns25: columnsThreeColumns25Parser,
  cards27: cards27Parser,
  tableNoHeader28: tableNoHeader28Parser,
  cardsNoImages29: cardsNoImages29Parser,
  columns30: columns30Parser,
  hero31: hero31Parser,
  hero32: hero32Parser,
  video33: video33Parser,
  cardsNoImages35: cardsNoImages35Parser,
  embedVideo36: embedVideo36Parser,
};

WebImporter.Import = {
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .map((block) => {
      const foundInstance = block.instances.find((instance) => instance.url === originalURL);
      if (foundInstance) {
        block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
      }
      return block;
    })
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserName = WebImporter.Import.getParserName({ name, cluster });
        const parserFn = parsers[parserName];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // pre-transform rules
    preTransformRules({
      root: main,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
