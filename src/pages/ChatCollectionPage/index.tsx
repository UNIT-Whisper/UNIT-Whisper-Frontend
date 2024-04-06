import useCloudStore from "@/store/chat/chat";

function ChatCollectionPage() {
  const clouds = useCloudStore(state => state.clouds);
  return <div className="relative">
              {clouds.map((el,index) => (
            <div
              key={index}
            >{el.text}</div>
          ))}
  </div>;
}

export default ChatCollectionPage;
