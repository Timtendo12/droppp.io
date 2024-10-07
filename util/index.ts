// @ts-nocheck
import crypto from 'crypto'

export const isMpEnabled = () => {
  return process.env.NEXT_PUBLIC_MP === 'true'
}

export const REFUND_REPLACEMENT_URL =
  'https://funko.com/replacement-refund-policy/replacement-refund-policy.html'

/**
 * CSRF Method (obfuscated below) - Leave commented please (Gene)
 *
 * I'd like to leave this method comment in here for reference assuming the min removes comments.
 */
/*
export function getCSRF(user, params) {
  if (user.csrf) {
     let split = user.csrf.split(":");
     if (split.length == 2) {
        params.append("csrf", "" + split[0] + ":" + crypto.createHash('sha256').update(split[1] + user.email).digest('hex'))
     }
  }
  return params; 
}
*/

/**
 * Dummy CSRF Method - Pre-drop - Leave commented please (Gene)
 */
//  export function getCSRF(user, params) {
//   return false;
//  }

/**
 * Obfuscated CSRF Method
 */
;(function (_0x5c753d, _0x23d0e9) {
  const _0x27e8c0 = _0x49f8,
    _0x123eb7 = _0x5c753d()
  while (!![]) {
    try {
      const _0x157daf =
        parseInt(_0x27e8c0(0xdd)) / 0x1 +
        (parseInt(_0x27e8c0(0xe9)) / 0x2) * (-parseInt(_0x27e8c0(0xe5)) / 0x3) +
        (parseInt(_0x27e8c0(0xe6)) / 0x4) * (parseInt(_0x27e8c0(0xed)) / 0x5) +
        -parseInt(_0x27e8c0(0xeb)) / 0x6 +
        (-parseInt(_0x27e8c0(0xee)) / 0x7) *
          (-parseInt(_0x27e8c0(0xea)) / 0x8) +
        parseInt(_0x27e8c0(0xe8)) / 0x9 +
        -parseInt(_0x27e8c0(0xdc)) / 0xa
      if (_0x157daf === _0x23d0e9) break
      else _0x123eb7['push'](_0x123eb7['shift']())
    } catch (_0xe7a406) {
      _0x123eb7['push'](_0x123eb7['shift']())
    }
  }
})(_0xd50b, 0x2b522)
function _0x49f8(_0x395d49, _0x4e4ab1) {
  const _0xd50b06 = _0xd50b()
  return (
    (_0x49f8 = function (_0x49f839) {
      _0x49f839 = _0x49f839 - 0xdc
      let _0xc05d90 = _0xd50b06[_0x49f839]
      return _0xc05d90
    }),
    _0x49f8(_0x395d49, _0x4e4ab1)
  )
}
function _0xd50b() {
  const _0x1dc97c = [
    '2817064CrxMse',
    '1233396MSBQVG',
    'update',
    '85yEFzFT',
    '7GmShGF',
    '4332030iaaLHB',
    '140145fryPnE',
    'length',
    'hex',
    'split',
    'createHash',
    'email',
    'sha256',
    'digest',
    '324579NGOxjb',
    '20180nYsttv',
    'csrf',
    '3117249rphsWz',
    '2JwaCgE'
  ]
  _0xd50b = function () {
    return _0x1dc97c
  }
  return _0xd50b()
}
export function getCSRF(_0x1614ef, _0x5855ae) {
  const _0x395557 = _0x49f8
  if (_0x1614ef['csrf']) {
    let _0x1030a2 = _0x1614ef[_0x395557(0xe7)][_0x395557(0xe0)](':')
    _0x1030a2[_0x395557(0xde)] == 0x2 &&
      _0x5855ae['append'](
        _0x395557(0xe7),
        '' +
          _0x1030a2[0x0] +
          ':' +
          crypto[_0x395557(0xe1)](_0x395557(0xe3))
            [_0x395557(0xec)](_0x1030a2[0x1] + _0x1614ef[_0x395557(0xe2)])
            [_0x395557(0xe4)](_0x395557(0xdf))
      )
  }
  return _0x5855ae
}
