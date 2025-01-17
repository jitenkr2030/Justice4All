'use client'

import { useEffect, useRef, useState } from 'react'
import { Network } from 'vis-network'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Node {
  id: number
  label: string
}

interface Edge {
  from: number
  to: number
}

export function KnowledgeGraph() {
  const [searchTerm, setSearchTerm] = useState('')
  const networkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (networkRef.current) {
      const nodes: Node[] = [
        { id: 1, label: 'Contract Law' },
        { id: 2, label: 'Tort Law' },
        { id: 3, label: 'Criminal Law' },
        { id: 4, label: 'Breach of Contract' },
        { id: 5, label: 'Negligence' },
        { id: 6, label: 'Theft' },
      ]

      const edges: Edge[] = [
        { from: 1, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 6 },
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

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', searchTerm)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Legal Knowledge Graph</CardTitle>
        <CardDescription>Visualize connections between legal concepts, cases, and statutes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Search legal concepts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <div ref={networkRef} style={{ height: '400px', border: '1px solid #ddd' }} />
      </CardContent>
    </Card>
  )
}

