```mermaid
%% Example of sequence diagram
  sequenceDiagram
   A->>B: hi ,你吃了吗？
   alt is eat
   B->>A: 吃了，你呢
   else not 
   B->>A: 还没，一起吧
   end

  opt Extra response
  C->>A: 吃饭记得叫我
  end  
```
​```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end

st->op->cond
cond(yes)->e
cond(no)->op
​```

```mermaid
graph TD
A[模块] --> |A1| B(模块B)
B --> C{判断条件}
C --> |条件C1| D[D]
C --> |条件C2| E[E]
C --> |条件C3| F[F]
 
```

```math
e^{i\pi} + 1 = 0
```

```mermaid
graph LR
A[Start] --> B[Your Operation]
B --> C{Yes or No?}
C -->|yes| D(end)
C -->|no| A
```

Basic sequence diagram

```mermaid
gitGraph:
options
{
    "nodeSpacing": 35,
    "nodeRadius": 10
}
end
commit
branch newbranch
checkout newbranch
commit
commit
checkout master
commit
commit
merge newbranch
```

```mermaid
sequenceDiagram
participant Alice 
%% participant 参与
participant Bob
Alice -->>John: Hello John, how are you?
loop HeathCheck
John-->>John: Fighting against hypochondria
end
Note right of John:Rational thoughts <br/> prevail
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```

```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
```