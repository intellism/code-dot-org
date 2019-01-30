import $ from 'jquery';
import assetUrl from '@cdo/apps/code-studio/assetUrl';
import jsonic from 'jsonic';
import { parseElement } from '@cdo/apps/xml';
import { installCustomBlocks } from '@cdo/apps/block_utils';
import { customInputTypes } from '@cdo/apps/gamelab/blocks';
import { valueTypeTabShapeMap } from '@cdo/apps/gamelab/GameLab';
import animationListModule, {
  setInitialAnimationList
} from '@cdo/apps/gamelab/animationListModule';
import defaultSprites from '@cdo/apps/gamelab/defaultSprites.json';
import { getStore, registerReducers } from '@cdo/apps/redux';

function renderSimpleBlock() {
  const name = "Ryanlab_moveForward";
  const config = '{"blockText": "move forward","func": "moveForward"}';
  const pool = "Ryanlab";
  const parsedConfig = jsonic(config);
  const blocksInstalled = installCustomBlocks({
    blockly: Blockly,
    blockDefinitions: [{
      name: name,
      pool: pool,
      category: 'Custom',
      config: parsedConfig,
    }],
    customInputTypes,
  });
  const blockName = Object.values(blocksInstalled)[0][0];
  const blocksDom = parseElement(`<block type="${blockName}" />`);
  Blockly.mainBlockSpace.clear();
  Blockly.Xml.domToBlockSpace(Blockly.mainBlockSpace, blocksDom);
}

$(document).ready(() => {
  registerReducers({animationList: animationListModule});
  getStore().dispatch(setInitialAnimationList(defaultSprites));
  Blockly.inject(document.getElementById('new-blockly'), {
      assetUrl,
      valueTypeTabShapeMap: valueTypeTabShapeMap(Blockly),
      typeHints: true});
  renderSimpleBlock();
});
