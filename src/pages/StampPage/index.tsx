import usePositionstore from '@/store/map/position';
import  {  ReactNode, useCallback, useEffect  } from 'react'
import cloudMarker from '@/images/marker.png'
import useStampstore, { stampType } from '@/store/map/stamp';
import dayjs from 'dayjs'
import Calendar from '@/svg/calendar.svg?react';
import Time from '@/svg/time.svg?react';
import Location from '@/svg/location.svg?react';
import { axiosInstance } from '@/apis/sendCloud';
import { useParams } from 'react-router-dom';
import useOpenstore from '@/store/map/open';

declare global {
    interface Window {
      kakao: any;
    }
  }


  const MarkerInfo : Array<stampType> = [
    {latitude: 37.547282739995964, longitude: 127.06659525293044, content : 
        "안녕",
createDate : new Date(), address : "서울특별시 성동구 아차산로 17길 48", whisperId : 1},
  ]

const StampPage = () => {
    const [myposition] = usePositionstore((state) => [state.position]);
    const [stamp,  setStamp] = useStampstore((state)=>[state.stamp, state.setStamp]);
    const [open, setOpen] = useOpenstore((state)=>[state.open, state.setOpen]);
    const { whisperId } = useParams();
    const whisperIdx: number = parseInt(whisperId!);
    useEffect(() => {
        const mapScript = document.createElement("script");
    
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=34b875f3f1bb52af7bfb9963e4dbc291&autoload=false&libraries=services`;
    
        document.head.appendChild(mapScript);
        const loadDataAndCreateMap = async () => {
                    axiosInstance.get(`/whisper/${whisperIdx}`,{
                        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken') as string}` },
                      }).then(
                        response => {
                            setStamp({
                                whisperId : response.data.data.whisperId,
                                latitude : response.data.data.latitude,
                                longitude : response.data.data.longitude,
                                createDate : response.data.data.createDate,
                                content : response.data.data.content,
                                address : response.data.data.address,
                            });
                                window.kakao.maps.load(() => {
                                  const container = document.getElementById("map");
                                  const options = {
                                    // 여기에 알람이 간 위도 경도를 보내주시면 됩니다.
                                    center: new window.kakao.maps.LatLng(myposition.lat, myposition.lon),
                                    level: 3,
                                  };
                                  const map = new window.kakao.maps.Map(container, options);
                                  MarkerInfo.forEach((info)=>{
                                    const imageSrc = cloudMarker, 
                                    imageSize = new window.kakao.maps.Size(69, 48); // 마커 이미지의 크기
                                    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                                    const markerPosition = new window.kakao.maps.LatLng(info.latitude, info.longitude);
                                    const marker = new window.kakao.maps.Marker({
                                        position : markerPosition,
                                        image: markerImage
                                    });
                                    marker.setMap(map);
                                    window.kakao.maps.event.addListener(marker, 'click',()=>{
                                        setOpen(!open);
                                    });
                                  });
                                });
                        }
                      ).catch(
                        error => console.log(error),
                      )
        }
            mapScript.onload = loadDataAndCreateMap;
          return () => {
            // 컴포넌트가 언마운트 될 때 스크립트 태그 제거
            document.head.removeChild(mapScript);
          };
        }, []);
        
      return (
        <div className='relative w-full h-full'>
                <div
          id="map"
          className='w-full h-full'
        ></div>
        {open && <MarkInfo info={stamp} />}
        </div>
      );

}

const MarkInfo = ({info} : {info : stampType}) => {
    const InfoBtn = useCallback(({ children }: { children: ReactNode }) => {
        return (
          <div className="flex justify-center items-center gap-1.5 py-1.5 px-2 font-semibold font-Pretendard text-xs text-[#4A5568] bg-[#EDF2F7] rounded-md">
            {children}
          </div>
        );
      }, []);
    return(
        <div className='absolute bottom-0 flex w-full h-[350px] py-9 px-6 flex-col items-start gap-5 bg-white z-50'
        style={{
            "borderRadius" : "20px 20px 0px 0px",
        }}
        >
        <div className='py-4 w-full border-b-[1px] border-solid border-b-[#E2E8F0]'>
        <img src={cloudMarker} alt='정보로고' className='w-[70px] h-12'/>
        <div className=' font-Pretendard text-lg font-bold'>구름 내용 보기</div>
        <div className='flex gap-[9px]'>
            <InfoBtn>
                <Calendar />
                <div>{dayjs(info.createDate).format("YYYY.MM.DD")}</div>
            </InfoBtn>
            <InfoBtn>
                <Time />
                <div>{dayjs(info.createDate).format('hh:mm')}</div>
            </InfoBtn>
            <InfoBtn>
                <Location />
                <div>{info.address}</div>
            </InfoBtn>
        </div>
        </div>
        <div className='overflow-y-scroll whitespace-pre-wrap'>
        <div className='mb-1'>{info.content}</div>
        </div>
      </div>
    )
}

export default StampPage