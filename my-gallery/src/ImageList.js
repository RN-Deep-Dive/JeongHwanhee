import { FlatList, Dimensions, Image, Text, TouchableOpacity, Platform } from "react-native";

const width = Dimensions.get("screen").width;
const minColumSize = width >= 500 ? 200 : 130;
const divisor = width / minColumSize;
const numColumns = Math.floor(divisor);
const columnSize = width / numColumns;

// console.log('-----OS', Platform.OS);
// console.log('width', width);
// console.log('minColumSize', minColumSize);
// console.log('divisor', divisor);
// console.log('numColumns', numColumns);
// console.log('columnSize', columnSize);

export default ({ 
  imagesWithAddButton,
  onPressOpenGallery,
  onPressImage,
  onLongPressImage,
}) => {
  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize, 
            height: columnSize, 
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ fontWeight: "100", fontSize: 45 }}>+</Text>    
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => onPressImage(image)} onLongPress={() => onLongPressImage(id)}>
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={imagesWithAddButton} 
      renderItem={renderItem} 
      numColumns={numColumns} 
      style={{ zIndex: -1 }}
      onLayout={e => {
        // console.log('layout.width', e.nativeEvent.layout.width);
      }}
    />
  )
};