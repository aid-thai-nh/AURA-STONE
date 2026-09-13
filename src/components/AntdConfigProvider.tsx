import React from 'react';
import { ConfigProvider, theme } from 'antd';
import viVN from 'antd/locale/vi_VN';

interface AntdConfigProps {
  children: React.ReactNode;
}

export const AntdThemeConfig: React.FC<AntdConfigProps> = ({ children }) => {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#d4af37',
          colorInfo: '#d4af37',
          colorSuccess: '#34d399',
          colorWarning: '#fbbf24',
          colorError: '#f87171',
          colorBgBase: '#1c1916',
          colorBgContainer: '#24201c',
          colorBgElevated: '#2a2620',
          colorBorder: 'rgba(212, 175, 55, 0.35)',
          colorBorderSecondary: 'rgba(212, 175, 55, 0.2)',
          colorTextBase: '#fbf9f5',
          colorTextSecondary: '#ded7cb',
          colorTextTertiary: '#c5baa9',
          borderRadius: 0,
          borderRadiusSM: 0,
          borderRadiusLG: 0,
          fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: 13,
        },
        components: {
          Pagination: {
            itemActiveBg: 'rgba(212, 175, 55, 0.2)',
            itemBg: '#24201c',
            colorPrimary: '#ffd88a',
            colorPrimaryHover: '#ffffff',
            borderRadius: 0,
          },
          Select: {
            selectorBg: '#24201c',
            colorBorder: 'rgba(212, 175, 55, 0.35)',
            colorPrimaryHover: '#d4af37',
            optionSelectedBg: 'rgba(212, 175, 55, 0.2)',
            optionActiveBg: 'rgba(212, 175, 55, 0.1)',
            borderRadius: 0,
          },
          Input: {
            colorBgContainer: '#24201c',
            colorBorder: 'rgba(212, 175, 55, 0.35)',
            hoverBorderColor: '#d4af37',
            activeBorderColor: '#d4af37',
            borderRadius: 0,
          },
          Drawer: {
            colorBgElevated: '#1c1916',
            borderRadiusLG: 0,
          },
          DatePicker: {
            colorBgContainer: '#24201c',
            colorBgElevated: '#27231e',
            cellActiveWithRangeBg: 'rgba(212, 175, 55, 0.2)',
            cellHoverBg: 'rgba(212, 175, 55, 0.15)',
            cellRangeBorderColor: '#d4af37',
            borderRadius: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
