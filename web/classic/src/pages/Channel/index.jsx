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

import React from 'react';
import ChannelsTable from '../../components/table/channels';
import BlueFuturePageHeader from '../../components/common/BlueFuturePageHeader';

const File = () => {
  return (
    <div className='mt-[60px] px-2'>
      <BlueFuturePageHeader
        title='Channels / 渠道'
        description='接入和管理上游模型号池，配置优先级、分组、倍率和健康状态。'
      />
      <ChannelsTable />
    </div>
  );
};

export default File;
