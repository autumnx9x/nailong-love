import { useState, useCallback, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import StartPage from './components/StartPage'
import CharacterSelect from './components/CharacterSelect'
import CharacterDetail from './components/CharacterDetail'
import StoryPage from './components/StoryPage'
import EndingPage from './components/EndingPage'
import scenes from './data/scenes'
import stories from './data/stories'
import { calculateResult } from './data/endings'

/**
 * 游戏页面状态机
 *
 * 'start'   → 首页
 * 'select'  → 角色选择（2×2 田字格）
 * 'detail'  → 角色详情（确认 / 返回 / 右滑退出）
 * 'story'   → 8 个场景线性推进
 * 'ending'  → 结局展示（由 角色 + 标签 计算）
 */

const TOTAL_SCENES = 8

export default function App() {
  const [page, setPage] = useState('start')
  const [character, setCharacter] = useState(null)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [userTraits, setUserTraits] = useState({
    empathy: 0,
    expression: 0,
    stability: 0,
    adventure: 0,
    insight: 0,
    independence: 0,
  })

  // ---- 结局 + 匹配度 + 人格计算结果 ----
  const result = useMemo(() => {
    if (page === 'ending' && character && Object.keys(userTraits).length > 0) {
      return calculateResult(character.id, userTraits)
    }
    return null
  }, [page, character, userTraits])

  // ---- 首页 → 角色选择 ----
  const handleStart = useCallback(() => {
    setPage('select')
  }, [])

  // ---- 角色选择 → 角色详情 ----
  const handleSelectCharacter = useCallback((char) => {
    setCharacter(char)
    setPage('detail')
  }, [])

  // ---- 角色详情 → 返回选择 ----
  const handleBackToSelect = useCallback(() => {
    setCharacter(null)
    setPage('select')
  }, [])

  // ---- 角色详情 → 确认选择 → 开始第1个场景 ----
  const handleConfirmCharacter = useCallback((char) => {
    setCharacter(char)
    setSceneIndex(0)
    setUserTraits({ empathy: 0, expression: 0, stability: 0, adventure: 0, insight: 0, independence: 0 })
    setPage('story')
  }, [])

  // ---- 剧情选择 → 累计维度分 → 推进场景或进入结局 ----
  const handleChoice = useCallback(
    (scores) => {
      // 累计六个维度分
      setUserTraits((prev) => {
        const next = { ...prev }
        Object.entries(scores).forEach(([dim, val]) => {
          next[dim] = (next[dim] || 0) + val
        })
        return next
      })

      const nextIndex = sceneIndex + 1

      if (nextIndex >= TOTAL_SCENES) {
        setSceneIndex(nextIndex)
        setPage('ending')
      } else {
        setSceneIndex(nextIndex)
      }
    },
    [sceneIndex]
  )

  // ---- 结局 → 再玩一次 ----
  const handleRestart = useCallback(() => {
    setSceneIndex(0)
    setUserTraits({ empathy: 0, expression: 0, stability: 0, adventure: 0, insight: 0, independence: 0 })
    setPage('story')
  }, [])

  // ---- 回到首页 ----
  const handleHome = useCallback(() => {
    setCharacter(null)
    setSceneIndex(0)
    setUserTraits({ empathy: 0, expression: 0, stability: 0, adventure: 0, insight: 0, independence: 0 })
    setPage('start')
  }, [])

  // ---- 渲染 ----
  const currentScene = scenes[sceneIndex]
  const currentStoryEntry = stories.find((s) => s.sceneId === sceneIndex + 1)
  const charStory = currentStoryEntry?.characters?.[character?.id]
  const currentStoryData = charStory
    ? { dialogue: charStory.text, title: charStory.title }
    : null

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {page === 'start' && <StartPage key="start" onStart={handleStart} />}

        {page === 'select' && (
          <CharacterSelect key="select" onSelect={handleSelectCharacter} />
        )}

        {page === 'detail' && character && (
          <CharacterDetail
            key={`detail-${character.id}`}
            character={character}
            onConfirm={handleConfirmCharacter}
            onBack={handleBackToSelect}
          />
        )}

        {page === 'story' && character && currentScene && currentStoryData && (
          <StoryPage
            key={`story-${character.id}-${currentScene.id}`}
            character={character}
            scene={currentScene}
            storyData={currentStoryData}
            sceneIndex={sceneIndex}
            totalScenes={TOTAL_SCENES}
            onChoice={handleChoice}
          />
        )}

        {page === 'ending' && character && result && (
          <EndingPage
            key={`ending-${result.ending.id}`}
            result={result}
            character={character}
            onRestart={handleRestart}
            onHome={handleHome}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
