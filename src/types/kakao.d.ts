export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao.maps {
    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Map {
      constructor(container: HTMLElement | null, options: MapOptions);
      setCenter(latlng: LatLng): void;
      setLevel(level: number): void;
    }

    interface MapOptions {
      center: LatLng;
      level: number;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
    }

    class InfoWindow {
      constructor(options: InfoWindowOptions);
      open(map: Map, marker: Marker): void;
      close(): void;
    }

    interface InfoWindowOptions {
      content: string | HTMLElement;
      removable?: boolean;
      zIndex?: number;
      position: LatLng;
      maxWidth?: number;
      pixelOffset?: Point;
      disableAutoPan?: boolean;
    }

    class Point {
      constructor(x: number, y: number);
    }

    namespace services {
      class Places {
        keywordSearch(
          keyword: string,
          callback: (result: any, status: Status, pagination: Pagination) => void,
        ): void;
      }

      enum Status {
        OK = 'OK',
        ZERO_RESULT = 'ZERO_RESULT',
        ERROR = 'ERROR',
      }

      interface Pagination {
        current: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        last: number;
        nextPage(): void;
        prevPage(): void;
      }
    }
  }
}
