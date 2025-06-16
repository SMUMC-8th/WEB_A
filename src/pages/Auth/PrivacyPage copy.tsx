import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto font-sans text-sm min-h-screen bg-white pt-8 pb-10">
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 mb-4">
        <button onClick={() => navigate(-1)} className="text-lg">
          ←
        </button>
        <div className="text-base font-semibold">개인정보 처리방침</div>
        <div className="w-6" />
      </div>

      {/* 본문 내용 */}
      <div className="px-4 space-y-6 overflow-y-auto  text-gray-800 leading-relaxed">
        <div>
          <strong>제1조 (목적)</strong>
          <p>
            본 약관은 SMP(이하 “회사”)가 제공하는 위치기반 소셜네트워크 서비스(이하 “서비스”)의
            이용조건 및 절차, 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </div>

        <div>
          <strong>제2조 (정의)</strong>
          <p>
            1. “서비스”란 사용자의 위치정보를 기반으로 콘텐츠를 등록하거나, 다른 이용자와 소통할 수
            있도록 회사가 제공하는 플랫폼(SMP)을 의미합니다.
            <br />
            2. “이용자”란 본 약관에 따라 회사와 서비스 이용계약을 체결하고, SMP를 이용하는 개인 또는
            단체를 말합니다.
          </p>
        </div>

        <div>
          <strong>제3조 (약관의 효력 및 변경)</strong>
          <p>
            1. 본 약관은 SMP 앱 및 웹사이트 내에 게시 또는 기타 전자적 수단을 통해 공시함으로써
            효력을 발생합니다.
            <br />
            2. 회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 최소 7일
            전에 공지합니다.
            <br />
            3. 이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.
          </p>
        </div>

        <div>
          <strong>제4조 (서비스의 제공 및 변경)</strong>
          <p>
            1. 회사는 위치기반 서비스, 사용자 간 커뮤니케이션 기능, 콘텐츠 업로드 및 열람 기능 등을
            제공합니다.
            <br />
            2. 회사는 서비스의 전부 또는 일부를 변경하거나 종료할 수 있으며, 이에 대해 사전
            공지합니다.
          </p>
        </div>

        <div>
          <strong>제5조 (서비스 이용의 제한)</strong>
          <p>
            회사는 다음 각 호에 해당하는 경우 서비스 이용을 제한하거나 중지할 수 있습니다.
            <br />
            1. 타인의 개인정보를 도용한 경우
            <br />
            2. 공공질서 및 미풍양속을 해치는 행위를 한 경우
            <br />
            3. 허위정보를 제공하거나 서비스를 부정하게 이용한 경우
            <br />
            4. 기타 법령이나 회사 정책에 위반되는 행위가 확인된 경우
          </p>
        </div>

        <div>
          <strong>제6조 (이용자의 의무)</strong>
          <p>
            1. 이용자는 관련 법령, 본 약관, 서비스 이용안내 및 주의사항 등 회사가 통지하는 사항을
            준수해야 합니다.
            <br />
            2. 이용자는 타인의 정보를 무단으로 수집하거나 공개하지 않아야 합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
