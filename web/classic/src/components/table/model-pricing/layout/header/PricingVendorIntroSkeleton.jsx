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

import React, { memo } from 'react';
import { Card, Skeleton } from '@douyinfe/semi-ui';

const createSkeletonRect = (style = {}, key = null) => (
  <div key={key} className='animate-pulse' style={style} />
);

const PricingVendorIntroSkeleton = memo(() => {
  const placeholder = (
    <Card className='bluefuture-pricing-intro' bordered={false}>
      <div className='flex items-start justify-between gap-4 mb-4'>
        <div className='flex-1 min-w-0'>
          <Skeleton.Title
            active
            style={{ width: 120, height: 14, marginBottom: 10 }}
          />
          <Skeleton.Title
            active
            style={{ width: 210, height: 28, marginBottom: 10 }}
          />
          <Skeleton.Paragraph active rows={1} style={{ width: '64%' }} />
        </div>
        {createSkeletonRect(
          {
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: 'var(--semi-color-fill-0)',
            border: '1px solid var(--semi-color-border)',
          },
          'avatar',
        )}
      </div>

      <div className='bluefuture-pricing-toolbar'>
        {createSkeletonRect(
          {
            width: '100%',
            height: 40,
            borderRadius: 8,
            backgroundColor: 'var(--semi-color-fill-0)',
            border: '1px solid var(--semi-color-border)',
          },
          'search',
        )}
        {createSkeletonRect(
          {
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: 'var(--semi-color-fill-0)',
            border: '1px solid var(--semi-color-border)',
          },
          'copy',
        )}
      </div>
    </Card>
  );

  return <Skeleton loading={true} active placeholder={placeholder}></Skeleton>;
});

PricingVendorIntroSkeleton.displayName = 'PricingVendorIntroSkeleton';

export default PricingVendorIntroSkeleton;
