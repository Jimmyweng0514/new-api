/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { memo, useCallback } from 'react';
import {
  Input,
  Button,
  Switch,
  Select,
  Divider,
  Tooltip,
} from '@douyinfe/semi-ui';
import { IconSearch, IconCopy, IconFilter } from '@douyinfe/semi-icons';
import { LayoutGrid, Table2 } from 'lucide-react';

const SearchActions = memo(
  ({
    selectedRowKeys = [],
    copyText,
    handleChange,
    handleCompositionStart,
    handleCompositionEnd,
    isMobile = false,
    searchValue = '',
    setShowFilterModal,
    showWithRecharge,
    setShowWithRecharge,
    currency,
    setCurrency,
    siteDisplayType,
    showRatio,
    setShowRatio,
    viewMode,
    setViewMode,
    tokenUnit,
    setTokenUnit,
    t,
  }) => {
    const supportsCurrencyDisplay = siteDisplayType !== 'TOKENS';

    const handleCopyClick = useCallback(() => {
      if (copyText && selectedRowKeys.length > 0) {
        copyText(selectedRowKeys);
      }
    }, [copyText, selectedRowKeys]);

    const handleFilterClick = useCallback(() => {
      setShowFilterModal?.(true);
    }, [setShowFilterModal]);

    const handleViewModeToggle = useCallback(() => {
      setViewMode?.(viewMode === 'table' ? 'card' : 'table');
    }, [viewMode, setViewMode]);

    const handleTokenUnitToggle = useCallback(() => {
      setTokenUnit?.(tokenUnit === 'K' ? 'M' : 'K');
    }, [tokenUnit, setTokenUnit]);

    return (
      <div className='bluefuture-pricing-toolbar'>
        <div className='bluefuture-pricing-search'>
          <Input
            prefix={<IconSearch />}
            placeholder={t('模糊搜索模型名称')}
            value={searchValue}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onChange={handleChange}
            showClear
            size='large'
          />
        </div>

        <Tooltip content={t('复制已选模型')}>
          <Button
            theme='outline'
            type='tertiary'
            icon={<IconCopy />}
            onClick={handleCopyClick}
            disabled={selectedRowKeys.length === 0}
            className='bluefuture-icon-button'
            aria-label={t('复制')}
          />
        </Tooltip>

        {!isMobile && (
          <div className='bluefuture-pricing-controls'>
            <Divider layout='vertical' margin='8px' />

            {/* 充值价格显示开关 */}
            {supportsCurrencyDisplay && (
              <div className='bluefuture-switch-control'>
                <span>{t('充值价')}</span>
                <Switch
                  checked={showWithRecharge}
                  onChange={setShowWithRecharge}
                />
              </div>
            )}

            {/* 货币单位选择 */}
            {supportsCurrencyDisplay && showWithRecharge && (
              <Select
                value={currency}
                onChange={setCurrency}
                size='small'
                optionList={[
                  { value: 'USD', label: 'USD' },
                  { value: 'CNY', label: 'CNY' },
                  { value: 'CUSTOM', label: t('自定义货币') },
                ]}
              />
            )}

            {/* 显示倍率开关 */}
            <div className='bluefuture-switch-control'>
              <span>{t('倍率')}</span>
              <Switch checked={showRatio} onChange={setShowRatio} />
            </div>

            {/* 视图模式切换按钮 */}
            <Tooltip
              content={
                viewMode === 'table' ? t('切换卡片视图') : t('切换表格视图')
              }
            >
              <Button
                theme='outline'
                type='tertiary'
                icon={
                  viewMode === 'table' ? (
                    <LayoutGrid size={14} />
                  ) : (
                    <Table2 size={14} />
                  )
                }
                onClick={handleViewModeToggle}
                className='bluefuture-icon-button'
                aria-label={
                  viewMode === 'table' ? t('卡片视图') : t('表格视图')
                }
              />
            </Tooltip>

            {/* Token单位切换按钮 */}
            <Button
              theme='outline'
              type='tertiary'
              onClick={handleTokenUnitToggle}
              className='bluefuture-unit-button'
            >
              /1{tokenUnit}
            </Button>
          </div>
        )}

        {isMobile && (
          <Button
            theme='outline'
            type='tertiary'
            icon={<IconFilter />}
            onClick={handleFilterClick}
            className='!rounded-lg'
          >
            {t('筛选')}
          </Button>
        )}
      </div>
    );
  },
);

SearchActions.displayName = 'SearchActions';

export default SearchActions;
