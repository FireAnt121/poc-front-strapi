/*
 *
 * HomePage
 *
 */

import React, {memo, useState, useEffect, useRef} from 'react';

import {fetchContentTypes, fetchDocuments} from '../../utils/api';

import ContentTypesTable from '../../components/ContentTypesTable';

import {LoadingIndicatorPage} from '@strapi/helper-plugin';

import {Box} from '@strapi/design-system/Box';
import {BaseHeaderLayout} from '@strapi/design-system/Layout';

import { DocumentTree } from "../../components/DocumentTree";

const HomePage = () => {
  const contentTypes = useRef({});
  const contentTypes2 = useRef({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    contentTypes.current = await fetchContentTypes(); // Here
    console.log(contentTypes);
    console.log(await fetchDocuments());
    contentTypes2.current = await fetchDocuments();
    console.log(contentTypes2);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingIndicatorPage/>;
  }

  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout
          title="SEO"
          subtitle="Optimize your content to be SEO friendly"
          as="h2"
        />
      </Box>
      <ContentTypesTable contentTypes={contentTypes.current}/>
    </>
  );
};

export default memo(HomePage);
