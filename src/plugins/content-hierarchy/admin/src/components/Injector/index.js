import React, { memo, useState, useEffect, useRef } from 'react';
import { fetchContentTypes, fetchDocuments, updateDocuments } from '../../utils/api';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import FlipMove from 'react-flip-move';
import { Flex, Stack, Button, IconButton} from '@strapi/design-system';
import { Wrapper } from './styled';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from '@strapi/icons';

// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useCMEditViewDataManager } from '@strapi/helper-plugin';

// import { usePreviewData } from '../../hooks';
// import { pluginId } from '../../utils';
// import { PreviewButton } from '../';

const Injector = () => {
    var contentTypes2 = useRef({});
    const [items, setItems] = useState('');
    const levels = { level1: [] };

    const listItems = {};
  const {
    allLayoutData,
    // hasDraftAndPublish,
    initialData,
    // isCreatingEntry,
    // modifiedData,
  } = useCMEditViewDataManager();
//   const { id } = useParams();
//   const { uid } = allLayoutData.contentType;
//   const { contentTypes } = useSelector( state => state[ `${pluginId}_config` ].config );

//   const isSupportedType = contentTypes && contentTypes.includes( uid );
//   const shouldRender = isSupportedType && ! isCreatingEntry;

//   if ( ! shouldRender ) {
//     return null;
//   }

//   const { data, isLoading } = usePreviewData( uid, id, [ initialData ] );

//   if ( isLoading || ! data || ! data?.urls ) {
//     return null;
//   }

//   const { draftUrl, publishedUrl } = data.urls;
//   const isDraft = hasDraftAndPublish && ! modifiedData.publishedAt;

  const initialize = () => {
    let temp = [];
    let temp2 = [];
    levels.level1 = [];
    contentTypes2.entries[0].documents.forEach((item) => {
      if (item.Parent_Name === "" || item.Parent_Name === null ) {
        levels.level1.push({ id: item.id, pid: null, level2: []});
      }else {
        temp.push(item);
      }
    })

    temp.forEach((item,index) => {
      if (levels.level1.map(({ id }) => id).includes(item.Parent_ID) ) {
          levels.level1[index].level2.push({ id: item.id, pid: item.Parent_ID, level3: []  });
          document.getElementById(item.id).classList.remove('level3');
          document.getElementById(item.id).classList.add('level2');
      } else {
        temp2.push(item);
      }
    })
    // levels.level2 = l2;

      for ( let i = 0 ; i < levels.level1.length ; i++ ) {
          for ( let j = 0 ; j < levels.level1[i].level2.length ; j++ ) {
            temp2.forEach((item,index) => {
              if ( levels.level1[i].level2[j].id == item.Parent_ID) {
                levels.level1[i].level2[j].level3.push({ id: item.id, pid: item.Parent_ID });
                document.getElementById(item.id).classList.remove('level2');
                document.getElementById(item.id).classList.add('level3');
              }
            })                           
          }
      }

      // if (!levels.level1.map(({ id }) => id).includes(item.Parent_ID) && levels.level1[index]?.level2.length > 0 ) {
      //   levels.level1[index].level2.forEach((l2) => {
      //     if(l2.id == item.Parent_ID) {
      //       console.log(item.Title)
      //     }
      //   })
      //     // if (levels.level1[index].level2.map(({ id }) => id).includes(item.Parent_ID) ) {
      //     //   levels.level1[index].level2[l2index].level3.push({ id: item.id, pid: item.Parent_ID });
      //     //   document.getElementById(item.id).classList.remove('level2');
      //     //   document.getElementById(item.id).classList.add('level3');
      //     // }
      // }
    console.log("lrvrld",levels);

    // levels.level3 = l3;
  }
  const getItemFromId = id => {
    let its = null;
    contentTypes2.entries[0].documents.forEach((item) => {
      if (item.id === id)
        its = item;
    })
    return its;
  }
  const getItemFromIndex = index => {
    let its = null;
    contentTypes2.entries[0].documents.forEach((item,i) => {
      if (i === index)
        its = item;
    })
    return its;
  }

  const isInTop = (cid) => {
    let res = false;
    if( levels.level2.map(({ id }) => id).includes(cid) ) {
      if( levels.level2.findIndex(object => {
        return object.id === cid; }) === 0 ) {
          res = true
        }
    }
    return res;
  }

const findId = (id) => {
  for ( let i = 0 ; i < levels.level1.length ; i++ ) {
    if ( id == levels.level1[i].id) {
      return (i != 0 ) ? {level: "level1", prevId: levels.level1[i-1].id} : {level: "level1", prevId: null}
    }
    for ( let j = 0 ; j < levels.level1[i].level2.length ; j++ ) {
      if ( id == levels.level1[i].level2[j].id) {
        return (j != 0 ) ? {level: "level2", pId:levels.level1[i].level2[j].pid, prevId: levels.level1[i].level2[j-1].id} : {level: "level2", pId:levels.level1[i].level2[j].pid, prevId: null}
      }
      for ( let k = 0 ; k < levels.level1[i].level2[j].level3.length ; k++ ) {
        if ( id == levels.level1[i].level2[j].level3[k].id) {
          return (k != 0 ) ? {level: "level3", 
                              pId:levels.level1[i].level2[j].level3[k].pid, 
                              prevId: levels.level1[i].level2[j].level3[k-1].id} 
                              :
                              {level: "level3", 
                              pId:levels.level1[i].level2[j].level3[k].pid, 
                              prevId: null}
        }
      }                         
    }
  }
}

  const onArrowUp = async (id, index) => {
    if(index > 0) { 
      let res = findId(id);
      if ( res.prevId != null ) {
        let currentItem = getItemFromId(id);
        let newItem = getItemFromId(res.prevId);
        await updateDocuments({ id: id, body: { Order: newItem.Order } });
        await updateDocuments({ id: newItem.id, body: { Order: currentItem.Order } })
        updateList();
      }
      // let currentItem = getItemFromIndex(index);
      // let newItem = getItemFromIndex(index - 1);
      // if( !isInTop(id) ) {
      //   await updateDocuments({ id: currentItem.id, body: { Order: newItem.Order } });
      //   await updateDocuments({ id: newItem.id, body: { Order: currentItem.Order } })
      //   updateList();
      // }
    }
  }

  const onArrowDown = async (id, index) => {
    if(index < contentTypes2.entries[0].documents.length - 1) { 
      let res = findId(id);
      if ( res.prevId != null ) {
        let currentItem = getItemFromId(id);
        let newItem = getItemFromId(res.prevId);
        await updateDocuments({ id: id, body: { Order: newItem.Order } });
        await updateDocuments({ id: newItem.id, body: { Order: currentItem.Order } })
        updateList();
      }
      // let currentItem = getItemFromIndex(index);
      // let newItem = getItemFromIndex(index + 1);
      // console.log(currentItem.id, newItem.id);
      // await updateDocuments({ id: currentItem.id, body: { Order: newItem.Order }});
      // await updateDocuments({ id: newItem.id, body: { Order: currentItem.Order } })
      // updateList();
    }
  }
  const onArrowRight = async (event,index) => {
    if(index > 0) { 
      let currentItem = getItemFromIndex(index);
      let newItem = getItemFromIndex(index - 1);

      if ( levels.level1.map(({ id }) => id).includes(newItem.id) && !levels.level2.map(({id}) => id).includes(currentItem.id)) {
        await updateDocuments({ id: currentItem.id, body: { Parent_Name: newItem.Title, Parent_ID: newItem.id} })
      } else if ( levels.level2.map(({ id }) => id).includes(newItem.id) && levels.level1.map(({id}) => id).includes(currentItem.id)) {
        let parentItem = getItemFromId(newItem.pid);
        await updateDocuments({ id: currentItem.id, body: { Parent_Name: parentItem.Title, Parent_ID: parentItem.id} })
      } else if ( levels.level2.map(({ id }) => id).includes(newItem.id) && levels.level2.map(({id}) => id).includes(currentItem.id)) {
        let parentItem = getItemFromId(newItem.id);
        await updateDocuments({ id: currentItem.id, body: { Parent_Name: parentItem.Title, Parent_ID: parentItem.id} })
      }
      updateList();
      // else if ( levels.level2.includes(newItem.id) ) {
      //   let parentItem = getItemFromId()

      // }
      // // const ele = event.target.parentElement.parentElement;
      // // console.log(ele);
      // // ele.classList.add('level2');
      // await updateDocuments({ id: currentItem.id, body: { Parent_Name: newItem.Title, Parent_ID: newItem.id} })
      // updateList();
    }
  }
  const onArrowLeft = () => {

  }

  const sortItems = () => {
    contentTypes2?.entries[0].documents.sort(function(a, b){return (a.Order)-(b.Order)});
    // contentTypes2?.entries[0].documents.sort(function(a, b){  
    //   return levels.level1.indexOf(a) - levels.level1.indexOf(b);
    // });
  }

  const updateList = async () => {
    contentTypes2 = await fetchDocuments(initialData?.Version);
    console.log(contentTypes2);

    if (contentTypes2?.entries.length > 0 ) {
      sortItems();
      setItems(contentTypes2?.entries[0].documents.map((item,index) => 
      <Flex id={item.id} key={item.id}>
        {item?.Title}
        <Flex>
          <IconButton onClick={() => onArrowUp(item.id,index)} icon={<ArrowUp />} />
          <IconButton onClick={() => onArrowDown(item.id,index)} icon={<ArrowDown />} />
          <IconButton onClick={(e) => onArrowLeft(e, index)} icon={<ArrowLeft />} />
          <IconButton onClick={(e) => onArrowRight(e, index)} icon={<ArrowRight />} />
        </Flex>
      </Flex>
      ));
      initialize();
      console.log(levels);
    }
  }
  
  useEffect(async () => {
      if(allLayoutData.contentType.apiID === 'version')
        await updateList()
  }, []);

  return (
    <div>
       { items != '' ?
      <Wrapper>
      <Stack spacing={ 4 }>
          <FlipMove>
           { items }
          </FlipMove>
      </Stack>
      </Wrapper>
      : '' }
    </div>
  );
};

export default Injector;
