                                 
                                                                                        
  
  
                                                      
                                                                                
                                                      
                                                                  
                                                                                                                        
                                                            
                   
                                                                                     
                                      
                    
    
  
                                                                          
                                                                        
                                                                                                            
                                                                           
      
  
                                               
                    
                                        
                     
         
                  
                                             
                                  
                               
                 
                
       
                                                 
                  
         
                                        
                                                                    
       
      
  
        
                                                                              
                                                                      
        
                                                  
                                                   
                                          
            
       
  
                                                                             
                                                                     
                      
                                                                       
                                                                  
  
                                                   
  
        
                                                                                
     
           
                                               
         
     
                                                                           
     
                                                  
                         
                                                                                       
                                                                           
                                                                          
                                                                                
        
                                                    
  
                                                                       
                                                                   
  
                                         
                                         
                                         
                                         
                                            
                                         

enum LoggerTopic {
  XstateParentChildMachineCommunication = 'XstateParentChildMachineCommunication',
}

class Logger {
  public readonly arr_LogGivenTopics: (string | LoggerTopic)[] = [];           
  public mode_LogAllTopics = false;
  public mode_PrintWithTopics = false;
  public mode_PrintWithTags = false;
  public mode_ShowEmptyTopicArr = false;
  public mode_ShowEmptyTagArr = false;

  public log(obj: unknown, topics: (string | LoggerTopic)[] = [], tags: string[] = []) {
    if (this.mode_LogAllTopics) {
      this.log_helper(obj, topics, tags);
    } else {
      for (const topic_curr of topics) {
        if (this.arr_LogGivenTopics.includes(topic_curr)) {
          this.log_helper(obj, topics, tags);
        }
      }
    }
  }

  private log_helper(obj: unknown, topics: (string | LoggerTopic)[] = [], tags: string[] = []) {
    let str_TopicPart: string | null = null;
    if (this.mode_PrintWithTopics && topics.length > 0) {
      str_TopicPart = `[${topics.join(', ')}]`;
    } else {
      if (this.mode_ShowEmptyTopicArr) {
        str_TopicPart = '[]';
      }
    }
    let str_TagPart: string | null = null;
    if (this.mode_PrintWithTags && tags.length > 0) {
      str_TagPart = `[${tags.join(', ')}]`;
    } else {
      if (this.mode_ShowEmptyTagArr) {
        str_TagPart = '[]';
      }
    }

    const str_separator = '::';
    let str_WholePrependPart: string | null = null;
    if (str_TopicPart && str_TagPart) {
      str_WholePrependPart = `${str_TopicPart} ${str_TagPart}${str_separator} `;
    } else if (str_TopicPart) {
      str_WholePrependPart = `${str_TopicPart}${str_separator} `;
    } else if (str_TagPart) {
      str_WholePrependPart = `${str_TagPart}${str_separator} `;
    }

    if (str_WholePrependPart) {
      console.log(`${str_WholePrependPart}${obj}`);
    } else {
      console.log(obj);
    }
  }
}

const logger = new Logger();
logger.mode_LogAllTopics = true;
logger.mode_PrintWithTopics = true;
logger.mode_PrintWithTags = true;
logger.mode_ShowEmptyTopicArr = true;
logger.mode_ShowEmptyTagArr = false;

export default logger;

                      
                                           
                                                     
                                                      
                                                                                                                                                      
                                                                                                                             
                                           

                                                          
