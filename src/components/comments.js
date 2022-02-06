import React, { createRef, useEffect } from "react"

export default function Comment({ repo, theme }) {
  const containerRef = createRef()
  useEffect(() => {
    const utterances = document.createElement("script")
    const attributes = {
      src: "https://utteranc.es/client.js",
      repo,
      "issue-term": "pathname",
      label: "comment !",
      theme,
      crossOrigin: "anonymous",
      async: "true",
    }
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })
    containerRef.current.appendChild(utterances)
  }, [repo, theme, containerRef])
  return <div id="comment" ref={containerRef} />
}
