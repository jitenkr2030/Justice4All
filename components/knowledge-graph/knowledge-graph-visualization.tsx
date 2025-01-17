"use client"

import { useEffect, useRef } from 'react'
import { Network } from 'vis-network'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Node {
  id: number
  label: string
}

interface Edge {
  from: number
  to: number
}

export function KnowledgeGraphVisualization() {
  const networkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (networkRef.current) {
      const nodes: Node[] = [
        { id: 1, label: 'Contract Law' },
        { id: 2, label: 'Tort Law' },
        { id: 3, label: 'Criminal Law' },
        { id: 4, label: 'Civil Procedure' },
        { id: 5, label: 'Constitutional Law' },
      ]

      const edges: Edge[] = [
        { from: 1, to: 4 },
        { from: 2, to: 4 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
      ]

      const network = new Network(networkRef.current, { nodes, edges }, {
        nodes: {
          shape: 'circle',
        },
        edges: {
          width: 2,
        },
        physics: {
          stabilization: false,
        },
      })

      return () => {
        network.destroy()
      }
    }
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Legal Knowledge Graph</CardTitle>
        <CardDescription>Visualize connections between legal concepts</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={networkRef} style={{ height: '400px', border: '1px solid #ddd' }} />
      </CardContent>
    </Card>
  )
}

