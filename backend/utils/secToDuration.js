// // Helper function to convert total seconds to the duration format
// function convertSecondsToDuration(totalSeconds) {
//     const hours = Math.floor(totalSeconds / 3600)
//     const minutes = Math.floor((totalSeconds % 3600) / 60)
//     const seconds = Math.floor((totalSeconds % 3600) % 60)
  
//     if (hours > 0) {
//       return `${hours}h ${minutes}m`
//     } else if (minutes > 0) {
//       return `${minutes}m ${seconds}s`
//     } else {
//       return `${seconds}s`
//     }
//   }
  
//   module.exports = {
//     convertSecondsToDuration,
//   }

// Helper function to convert total seconds to the duration format
function convertSecondsToDuration(totalSeconds) {
    const safeSeconds = Number.isFinite(totalSeconds) ? totalSeconds : 0
    const hours = Math.floor(safeSeconds / 3600)
    const minutes = Math.floor((safeSeconds % 3600) / 60)
    const seconds = Math.floor((safeSeconds % 3600) % 60)
  
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }
  
  module.exports = {
    convertSecondsToDuration,
  }